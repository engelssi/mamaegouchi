# UNIVERSIDADE ESTADUAL DE CIÊNCIAS DA SAÚDE DE ALAGOAS — UNCISAL
## PRÓ-REITORIA DE PESQUISA E PÓS-GRADUAÇÃO — PROPEP
### PROGRAMA INSTITUCIONAL DE BOLSAS DE INICIAÇÃO EM DESENVOLVIMENTO TECNOLÓGICO E INOVAÇÃO (PIBITI / CNPq / FAPEAL)

---

**DOCUMENTO DE SOLICITAÇÃO DE INFRAESTRUTURA DE TI (MEMORANDO / TICKET SUTIN)**

**PARA:** Superintendência de Tecnologia da Informação — SUTIN / UNCISAL  
**DE:** Coordenação e Equipe do Projeto MamãeGotchi (PIBITI Edital nº 01/2026)  
**RESPONSÁVEL:** Engels Castro (`engels.castro@academico.uncisal.edu.br`)  
**ASSUNTO:** Solicitação de Provisionamento de Máquina Virtual (VM) e Apontamento de DNS para Hospedagem do Sistema "MamãeGotchi"  
**DATA:** 02 de Outubro de 2026  

---

### 1. IDENTIFICAÇÃO DO PROJETO E JUSTIFICATIVA

O **MamãeGotchi** é uma tecnologia educacional em saúde desenvolvida no âmbito do **PIBITI / PROPEP — Edital nº 01/2026**, apoiado pelo **CNPq** e **FAPEAL**, vinculado à **Universidade Estadual de Ciências da Saúde de Alagoas (UNCISAL)**.

Trata-se de um simulador interativo de cuidados em saúde materna (gestação e puerpério) inspirado na mecânica de animais virtuais, fundamentado nas diretrizes do Ministério da Saúde / SUS, FEBRASGO e SBP. 

A disponibilização pública do sistema em infraestrutura institucional é etapa primordial para:
1. Validação científica e extensão universitária com discentes, gestantes e profissionais de saúde.
2. Cumprimento dos produtos tecnológicos pactuados no plano de trabalho PIBITI/PROPEP.
3. Garantia de disponibilidade, segurança da informação e perenidade sob o domínio institucional da UNCISAL.

---

### 2. ESCOPO ARQUITETURAL DA APLICAÇÃO (BAIXO CONSUMO)

A aplicação foi projetada com arquitetura moderna **Client-Side SPA (Single Page Application)** utilizando React e Vite. 
* **Sem Carga Contínua de Servidor**: Toda a lógica de decaimento de status, sons (Web Audio API) e leitor de voz (Web Speech API) executa no navegador do cliente.
* **Sem Necessidade de Banco de Dados Relacional**: Não requer instâncias de PostgreSQL, MySQL ou SQL Server nesta fase.
* **Container Leve**: O sistema já está encapsulado em imagem Docker com **Nginx Alpine de apenas ~25 MB**, gerando tráfego de rede mínimo e uso irrisório de CPU/RAM.

---

### 3. ESPECIFICAÇÕES TÉCNICAS DA MÁQUINA VIRTUAL SOLICITADA

Solicitamos à SUTIN o provisionamento de uma Máquina Virtual (VM) em ambiente de virtualização institucional (Proxmox, VMware, Hyper-V ou similar), com o seguinte dimensionamento:

| Parâmetro | Especificação Solicitada | Justificativa |
| :--- | :--- | :--- |
| **Sistema Operacional** | Linux Ubuntu Server 22.04 LTS ou Debian 12 (64-bit) | Padrão estável para containers Docker e Nginx |
| **Processador (vCPU)** | 2 vCPUs | Suficiente para atender picos de requisições web estáticas |
| **Memória RAM** | 2 GB a 4 GB | Margem confortável para o SO e o container (~50MB de uso real) |
| **Armazenamento (Disco)** | 20 GB a 30 GB (Thin Provisioning) | Sistema operacional, logs do Nginx e imagens Docker |
| **Ambiente de Execução** | Docker Engine e Docker Compose instalados | Facilita a manutenção, rollback e atualizações contínuas |

---

### 4. REQUISITOS DE REDE, PORTAS E DOMÍNIO

1. **Portas de Entrada Liberadas (Firewall UNCISAL)**:
   * **Porta 22 (SSH)**: Acesso administrativo remoto restrito (ou via VPN institucional da Uncisal).
   * **Porta 80 (HTTP)**: Redirecionamento obrigatório para HTTPS.
   * **Porta 443 (HTTPS)**: Tráfego seguro para os usuários finais.

2. **Configuração de Domínio / DNS**:
   * O solicitante já possui a titularidade do domínio destinado à aplicação.
   * **Ação solicitada à SUTIN**: Disponibilizar o IP público fixo da VM (ou IP do Proxy Reverso/WAF institucional) para que possamos apontar a entrada DNS (Registro tipo `A` ou `CNAME`), OU realizar o roteamento pelo proxy reverso já existente da SUTIN.

3. **Certificado Digital SSL/TLS (HTTPS)**:
   * Necessário para conformidade com a LGPD e para autorização dos recursos de áudio/voz dos navegadores.
   * Pode ser utilizado o certificado institucional Wildcard da UNCISAL ou emissão automatizada via **Let's Encrypt / Certbot**.

---

### 5. PROCEDIMENTO DE IMPLANTAÇÃO E DEPLOY

A equipe do projeto já dispõe dos arquivos de automação para deploy imediato assim que a VM for disponibilizada:
* `Dockerfile` multi-stage otimizado.
* `docker-compose.yml` padronizado.
* `nginx.conf` com compressão Gzip e headers de segurança (`X-Frame-Options`, `X-Content-Type-Options`, `Content-Security-Policy`).

O deploy pode ser executado em menos de **10 minutos** pela equipe do projeto via SSH ou pelo analista responsável da SUTIN.

---

### 6. RESPONSÁVEIS PELO CHAMADO E CONTATOS

* **Responsável Técnico / Desenvolvedor:** Engels Castro
* **E-mail Institucional:** `engels.castro@academico.uncisal.edu.br`
* **Vínculo:** Projeto PIBITI / PROPEP — UNCISAL (Edital 01/2026)

Colocamo-nos à inteira disposição da SUTIN para reuniões de alinhamento técnico, esclarecimento de dúvidas ou homologação conjunta da VM.

---

Maceió - AL, 02 de Outubro de 2026.

_____________________________________________________  
**Equipe do Projeto MamãeGotchi**  
Iniciação em Desenvolvimento Tecnológico e Inovação — PIBITI / PROPEP  
Universidade Estadual de Ciências da Saúde de Alagoas — UNCISAL  
