const fs = require('fs');
const path = require('path');
const { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  Table, 
  TableRow, 
  TableCell, 
  WidthType, 
  AlignmentType, 
  HeadingLevel, 
  BorderStyle,
  ShadingType
} = require('docx');

async function generateDocx() {
  const doc = new Document({
    creator: "UNCISAL - PROPEP - PIBITI",
    title: "Solicitação de Infraestrutura de TI - SUTIN",
    description: "Solicitação de Máquina Virtual para o Projeto MamãeGotchi",
    styles: {
      default: {
        document: {
          run: {
            font: "Calibri",
            size: 22, // 11pt
            color: "2D3748"
          }
        }
      }
    },
    sections: [{
      properties: {
        page: {
          margin: {
            top: 1440, // 1 inch
            right: 1440,
            bottom: 1440,
            left: 1440
          }
        }
      },
      children: [
        // Institutional Header
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: "UNIVERSIDADE ESTADUAL DE CIÊNCIAS DA SAÚDE DE ALAGOAS — UNCISAL",
              bold: true,
              size: 24, // 12pt
              color: "1A365D"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: "PRÓ-REITORIA DE PESQUISA E PÓS-GRADUAÇÃO — PROPEP",
              bold: true,
              size: 22, // 11pt
              color: "2B6CB0"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 240 },
          children: [
            new TextRun({
              text: "PROGRAMA INSTITUCIONAL DE BOLSAS DE INICIAÇÃO EM DESENVOLVIMENTO TECNOLÓGICO E INOVAÇÃO (PIBITI / CNPq / FAPEAL)",
              size: 18, // 9pt
              color: "4A5568"
            })
          ]
        }),

        // Divider
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 240 },
          children: [
            new TextRun({
              text: "_________________________________________________________________________________",
              color: "CBD5E0"
            })
          ]
        }),

        // Document Title
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 120, after: 240 },
          children: [
            new TextRun({
              text: "SOLICITAÇÃO DE INFRAESTRUTURA DE TI (MEMORANDO / TICKET SUTIN)",
              bold: true,
              size: 24, // 12pt
              color: "C53030"
            })
          ]
        }),

        // Meta Info Table
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  shading: { fill: "F7FAFC", type: ShadingType.CLEAR },
                  children: [
                    new Paragraph({
                      spacing: { before: 60, after: 60 },
                      children: [
                        new TextRun({ text: "PARA: ", bold: true }),
                        new TextRun("Superintendência de Tecnologia da Informação — SUTIN / UNCISAL")
                      ]
                    }),
                    new Paragraph({
                      spacing: { before: 60, after: 60 },
                      children: [
                        new TextRun({ text: "DE: ", bold: true }),
                        new TextRun("Coordenação e Equipe do Projeto MamãeGotchi (PIBITI Edital nº 01/2026)")
                      ]
                    }),
                    new Paragraph({
                      spacing: { before: 60, after: 60 },
                      children: [
                        new TextRun({ text: "RESPONSÁVEL: ", bold: true }),
                        new TextRun("Engels Castro (engels.castro@academico.uncisal.edu.br)")
                      ]
                    }),
                    new Paragraph({
                      spacing: { before: 60, after: 60 },
                      children: [
                        new TextRun({ text: "ASSUNTO: ", bold: true }),
                        new TextRun("Provisionamento de Máquina Virtual (VM) para Hospedagem do Sistema MamãeGotchi")
                      ]
                    }),
                    new Paragraph({
                      spacing: { before: 60, after: 60 },
                      children: [
                        new TextRun({ text: "DATA: ", bold: true }),
                        new TextRun("02 de Outubro de 2026")
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        }),

        new Paragraph({ spacing: { before: 240 } }),

        // Section 1
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 180, after: 120 },
          children: [
            new TextRun({
              text: "1. IDENTIFICAÇÃO DO PROJETO E JUSTIFICATIVA",
              bold: true,
              size: 22,
              color: "1A365D"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFY,
          spacing: { after: 120 },
          children: [
            new TextRun("O "),
            new TextRun({ text: "MamãeGotchi", bold: true }),
            new TextRun(" é uma tecnologia educacional em saúde desenvolvida no âmbito do "),
            new TextRun({ text: "PIBITI / PROPEP — Edital nº 01/2026", bold: true }),
            new TextRun(", apoiado pelo CNPq e FAPEAL, vinculado à Universidade Estadual de Ciências da Saúde de Alagoas (UNCISAL). Trata-se de um simulador interativo de cuidados em saúde materna (gestação e puerpério) inspirado na mecânica de animais virtuais, fundamentado nas diretrizes oficiais do Ministério da Saúde / SUS, FEBRASGO e SBP.")
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFY,
          spacing: { after: 180 },
          children: [
            new TextRun("A disponibilização do sistema na infraestrutura de servidores da UNCISAL é etapa indispensável para a validação pedagógica com discentes e gestantes, cumprimento dos objetivos tecnológicos pactuados no plano de pesquisa e garantia da segurança e integridade das informações sob os domínios da universidade.")
          ]
        }),

        // Section 2
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 180, after: 120 },
          children: [
            new TextRun({
              text: "2. ESCOPO ARQUITETURAL DA APLICAÇÃO (BAIXO CONSUMO)",
              bold: true,
              size: 22,
              color: "1A365D"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFY,
          spacing: { after: 120 },
          children: [
            new TextRun("A aplicação foi construída com arquitetura moderna "),
            new TextRun({ text: "Client-Side SPA (Single Page Application)", bold: true }),
            new TextRun(" em React 19 e Vite:")
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 60 },
          children: [
            new TextRun({ text: "Sem Carga Contínua de Servidor: ", bold: true }),
            new TextRun("Toda a lógica de decaimento, cálculos gestacionais por DUM, sintetizador de som (Web Audio API) e leitor de voz (Web Speech API) executa no próprio navegador do usuário final.")
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 60 },
          children: [
            new TextRun({ text: "Sem Necessidade de Banco de Dados Relacional: ", bold: true }),
            new TextRun("Não requer instâncias de PostgreSQL, MySQL ou SQL Server nesta fase.")
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 180 },
          children: [
            new TextRun({ text: "Container Ultra-Leve: ", bold: true }),
            new TextRun("A aplicação está empacotada em uma imagem Docker com servidor Nginx Alpine de apenas ~25 MB, consumindo menos de 50 MB de memória RAM em execução.")
          ]
        }),

        // Section 3
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 180, after: 120 },
          children: [
            new TextRun({
              text: "3. ESPECIFICAÇÕES TÉCNICAS DA MÁQUINA VIRTUAL SOLICITADA",
              bold: true,
              size: 22,
              color: "1A365D"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFY,
          spacing: { after: 120 },
          children: [
            new TextRun("Solicitamos à SUTIN o provisionamento de uma Máquina Virtual (VM) em ambiente de virtualização institucional (Proxmox, VMware ou Hyper-V), com os seguintes recursos:")
          ]
        }),

        // Technical Specs Table
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  shading: { fill: "EDF2F7", type: ShadingType.CLEAR },
                  children: [new Paragraph({ children: [new TextRun({ text: "Parâmetro", bold: true })] })]
                }),
                new TableCell({
                  shading: { fill: "EDF2F7", type: ShadingType.CLEAR },
                  children: [new Paragraph({ children: [new TextRun({ text: "Especificação Solicitada", bold: true })] })]
                }),
                new TableCell({
                  shading: { fill: "EDF2F7", type: ShadingType.CLEAR },
                  children: [new Paragraph({ children: [new TextRun({ text: "Justificativa Técnica", bold: true })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Sistema Operacional", bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun("Linux Ubuntu Server 22.04 LTS ou Debian 12")] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun("Padrão estável para execução de containers Docker")] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Processador (CPU)", bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun("2 vCPUs")] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun("Suficiente para atender requisições concorrentes")] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Memória RAM", bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun("2 GB a 4 GB")] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun("Margem confortável para o SO e o container (~50MB)")] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Armazenamento", bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun("20 GB a 30 GB (Thin Provisioning)")] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun("Espaço para o SO, Docker e logs")] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Ambiente Pré-instalado", bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun("Docker Engine + Docker Compose")] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun("Facilidade de deploy, isolamento e atualizações")] })] })
              ]
            })
          ]
        }),

        new Paragraph({ spacing: { before: 180 } }),

        // Section 4
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 180, after: 120 },
          children: [
            new TextRun({
              text: "4. REQUISITOS DE REDE, PORTAS E DOMÍNIO",
              bold: true,
              size: 22,
              color: "1A365D"
            })
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 60 },
          children: [
            new TextRun({ text: "Portas de Firewall: ", bold: true }),
            new TextRun("Porta 22 (SSH) para administração (ou via VPN interna da UNCISAL); Porta 80 (HTTP) e Porta 443 (HTTPS) liberadas para acesso dos usuários.")
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 60 },
          children: [
            new TextRun({ text: "Domínio Já Existente: ", bold: true }),
            new TextRun("O solicitante já é titular do domínio. É solicitado apenas o IP público da VM (ou IP do Proxy Reverso/WAF institucional) para apontamento do registro DNS (Registro A ou CNAME), ou configuração de roteamento no proxy da SUTIN.")
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 180 },
          children: [
            new TextRun({ text: "Certificado SSL/TLS (HTTPS): ", bold: true }),
            new TextRun("Indispensável para funcionamento dos recursos de áudio, síntese de voz e conformidade com a LGPD. Pode-se utilizar o certificado institucional ou Let's Encrypt / Certbot gratuito.")
          ]
        }),

        // Section 5
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 180, after: 120 },
          children: [
            new TextRun({
              text: "5. PROCEDIMENTO DE IMPLANTAÇÃO E DEPLOY",
              bold: true,
              size: 22,
              color: "1A365D"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFY,
          spacing: { after: 180 },
          children: [
            new TextRun("A equipe do projeto já disponibilizou no repositório o "),
            new TextRun({ text: "Dockerfile", bold: true }),
            new TextRun(", "),
            new TextRun({ text: "docker-compose.yml", bold: true }),
            new TextRun(" e as configurações do Nginx. A implantação requer menos de 10 minutos assim que o acesso SSH à VM for liberado.")
          ]
        }),

        // Section 6
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 180, after: 120 },
          children: [
            new TextRun({
              text: "6. RESPONSÁVEIS PELO CHAMADO E CONTATOS",
              bold: true,
              size: 22,
              color: "1A365D"
            })
          ]
        }),
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({ text: "Responsável Técnico / Desenvolvedor: ", bold: true }),
            new TextRun("Engels Castro")
          ]
        }),
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({ text: "E-mail Institucional: ", bold: true }),
            new TextRun("engels.castro@academico.uncisal.edu.br")
          ]
        }),
        new Paragraph({
          spacing: { after: 240 },
          children: [
            new TextRun({ text: "Vínculo: ", bold: true }),
            new TextRun("PIBITI / PROPEP — UNCISAL (Edital 01/2026)")
          ]
        }),

        // Signatures
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400, after: 60 },
          children: [
            new TextRun("Maceió - AL, 02 de Outubro de 2026.")
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400, after: 60 },
          children: [
            new TextRun("_____________________________________________________")
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 60 },
          children: [
            new TextRun({ text: "Equipe do Projeto MamãeGotchi", bold: true })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun("PIBITI / PROPEP — Universidade Estadual de Ciências da Saúde de Alagoas (UNCISAL)")
          ]
        })
      ]
    }]
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(__dirname, '..', 'SOLICITACAO_INFRAESTRUTURA_SUTIN.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Document created successfully at: ${outputPath}`);
}

generateDocx().catch(err => {
  console.error("Error generating docx:", err);
  process.exit(1);
});
