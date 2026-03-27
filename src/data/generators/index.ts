import { nmapGenerator } from './nmap';
import { amassGenerator } from './amass';
import { subfinderGenerator } from './subfinder';
import { assetfinderGenerator } from './assetfinder';
import { dnsxGenerator } from './dnsx';
import { naabuGenerator } from './naabu';
import { whoisGenerator } from './whois';
import { tracerouteGenerator } from './traceroute';
import { netdiscoverGenerator } from './netdiscover';
import { dirsearchGenerator } from './dirsearch';
import { wfuzzGenerator } from './wfuzz';
import { niktoGenerator } from './nikto';
import { whatwebGenerator } from './whatweb';
import { httpxGenerator } from './httpx';
import { dalfoxGenerator } from './dalfox';
import { xsstrikeGenerator } from './xsstrike';
import { medusaGenerator } from './medusa';
import { cewlGenerator } from './cewl';
import { searchsploitGenerator } from './searchsploit';
import { routersploitGenerator } from './routersploit';
import { theHarvesterGenerator } from './theharvester';
import { reconNgGenerator } from './recon-ng';
import { shodanGenerator } from './shodan';
import { maltegoGenerator } from './maltego';
import { spiderfootGenerator } from './spiderfoot';
import { wiresharkGenerator } from './wireshark';
import { tcpdumpGenerator } from './tcpdump';
import { bettercapGenerator } from './bettercap';
import { ettercapGenerator } from './ettercap';
import { netcatGenerator } from './netcat';
import { aircrackNgGenerator } from './aircrack-ng';
import { airodumpNgGenerator } from './airodump-ng';
import { aireplayNgGenerator } from './aireplay-ng';
import { reaverGenerator } from './reaver';
import { wifiteGenerator } from './wifite';
import { wgetGenerator } from './wget';
import { pythonHttpGenerator } from './python-http';
import { masscanGenerator } from './masscan';
import { sqlmapGenerator } from './sqlmap';
import { ffufGenerator } from './ffuf';
import { gobusterGenerator } from './gobuster';
import { hydraGenerator } from './hydra';
import { hashcatGenerator } from './hashcat';
import { johnGenerator } from './john';
import { metasploitGenerator } from './metasploit';
import { payloadGenerator } from './payload';
import { reverseShellGenerator } from './reverse-shell';
import { curlGenerator } from './curl';
import { base64Generator } from './base64';
import { bashGenerator } from './bash';
import { commixGenerator } from './commix';
import { wpscanGenerator } from './wpscan';
import { wordlistGenerator } from './wordlist';
import type { GeneratorConfig } from '../../types/generator';

export const allGenerators: GeneratorConfig[] = [
  nmapGenerator,
  amassGenerator,
  subfinderGenerator,
  assetfinderGenerator,
  dnsxGenerator,
  naabuGenerator,
  whoisGenerator,
  tracerouteGenerator,
  netdiscoverGenerator,
  dirsearchGenerator,
  wfuzzGenerator,
  niktoGenerator,
  whatwebGenerator,
  httpxGenerator,
  dalfoxGenerator,
  xsstrikeGenerator,
  medusaGenerator,
  cewlGenerator,
  searchsploitGenerator,
  routersploitGenerator,
  theHarvesterGenerator,
  reconNgGenerator,
  shodanGenerator,
  maltegoGenerator,
  spiderfootGenerator,
  wiresharkGenerator,
  tcpdumpGenerator,
  bettercapGenerator,
  ettercapGenerator,
  netcatGenerator,
  aircrackNgGenerator,
  airodumpNgGenerator,
  aireplayNgGenerator,
  reaverGenerator,
  wifiteGenerator,
  wgetGenerator,
  pythonHttpGenerator,
  masscanGenerator,
  sqlmapGenerator,
  ffufGenerator,
  gobusterGenerator,
  hydraGenerator,
  hashcatGenerator,
  johnGenerator,
  metasploitGenerator,
  payloadGenerator,
  reverseShellGenerator,
  commixGenerator,
  wpscanGenerator,
  curlGenerator,
  base64Generator,
  bashGenerator,
  wordlistGenerator
];
