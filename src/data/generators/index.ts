import { nmapGenerator } from './nmap';
import { masscanGenerator } from './masscan';
import { sqlmapGenerator } from './sqlmap';
import { ffufGenerator } from './ffuf';
import { gobusterGenerator } from './gobuster';
import { hydraGenerator } from './hydra';
import { hashcatGenerator } from './hashcat';
import { johnGenerator } from './john';
import { metasploitGenerator } from './metasploit';
import { payloadGenerator } from './payload';
import { reverseShellGenerator } from './reverseShell';
import { curlGenerator } from './curl';
import { base64Generator } from './base64';
import { bashGenerator } from './bash';
import type { GeneratorConfig } from '../../types/generator';

export const allGenerators: GeneratorConfig[] = [
  nmapGenerator,
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
  curlGenerator,
  base64Generator,
  bashGenerator
];
