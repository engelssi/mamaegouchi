# Guia de Integração: MamãeGotchi + Google Sheets (via Google Apps Script)
## Universidade Estadual de Ciências da Saúde de Alagoas — UNCISAL
### Projeto PIBITI / PROPEP — Edital nº 01/2026

Este guia ensina como conectar o **MamãeGotchi** diretamente a uma planilha no seu **Google Drive institucional (`@uncisal.edu.br`)** para receber as avaliações por estrelas e depoimentos das gestantes em tempo real, **sem precisar de banco de dados ou servidor backend**.

---

## 📋 Passo 1: Criar a Planilha no Google Drive

1. Acesse o seu Google Drive com seu e-mail institucional: [drive.google.com](https://drive.google.com)
2. Crie uma nova **Planilha do Google** e dê o nome:
   `MamãeGotchi - Avaliações das Usuárias (PIBITI)`
3. Na primeira linha (Linha 1), preencha os cabeçalhos das colunas exatamente assim:
   * **A1:** `Data e Hora`
   * **B1:** `Estrelas`
   * **C1:** `Nível de Satisfação`
   * **D1:** `Tags Selecionadas`
   * **E1:** `Comentários e Sugestões`
   * **F1:** `Semana Alcançada`
   * **G1:** `Fase do Jogo`
   * **H1:** `Decisões Saudáveis`
   * **I1:** `Dispositivo`

---

## 💻 Passo 2: Adicionar o Código do Google Apps Script

1. No menu superior da planilha, clique em:
   **Extensões** > **Apps Script**
2. Apague o código que estiver lá dentro (`function myFunction() { ... }`).
3. Cole o código abaixo exatamente como está:

```javascript
/**
 * MAMÃEGOTCHI - Webhook de Avaliações
 * UNCISAL - PIBITI / PROPEP (Edital nº 01/2026)
 * Pesquisador: Engels Castro
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};
    
    // Tenta ler o JSON enviado pelo jogo
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else if (e.parameter) {
      data = e.parameter;
    }
    
    // Formata a data e hora no fuso horário de Maceió/Alagoas
    var timestamp = Utilities.formatDate(new Date(), "America/Maceio", "dd/MM/yyyy HH:mm:ss");
    
    var stars = data.stars || 0;
    var ratingLabel = data.ratingLabel || "";
    var tags = Array.isArray(data.tags) ? data.tags.join(", ") : (data.tags || "");
    var feedback = data.feedback || "";
    var week = data.week ? "Semana " + data.week : "N/D";
    var phase = data.phase === "POSTPARTUM" ? "Puerpério" : "Gestação";
    var healthyChoices = (data.healthyChoices !== undefined) ? data.healthyChoices : "N/D";
    var device = data.device || "Navegador Web";
    
    // Adiciona uma nova linha na planilha
    sheet.appendRow([
      timestamp,
      stars,
      ratingLabel,
      tags,
      feedback,
      week,
      phase,
      healthyChoices,
      device
    ]);
    
    // Retorno com cabeçalhos de sucesso
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "success", 
      message: "Avaliação registrada com sucesso no Google Sheets!" 
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "error", 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Suporte para requisição GET de verificação de status
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "MamãeGotchi Webhook UNCISAL",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}
```

4. Clique no ícone de **Salvar** (💾 ou `Ctrl + S`).

---

## 🚀 Passo 3: Implantar o Script como Aplicativo da Web

1. No canto superior direito do Apps Script, clique no botão azul: **Implantar** (Deploy) > **Nova implantação**.
2. Na engrenagem (⚙️) ao lado de "Selecionar tipo", escolha: **Aplicativo da Web**.
3. Preencha os campos:
   * **Descrição:** `MamãeGotchi Webhook v1`
   * **Executar como:** `Eu (seu-email@academico.uncisal.edu.br)`
   * **Quem pode acessar:** `Qualquer pessoa` *(Importantíssimo: selecione "Qualquer pessoa" para que as usuárias consigam enviar as avaliações sem precisar fazer login no Google).*
4. Clique em **Implantar**.
5. Se o Google solicitar permissões, clique em **Autorizar acesso**, selecione sua conta e confirme.
6. Copie o link do **URL do aplicativo da Web** gerado (terá o formato: `https://script.google.com/macros/s/AKfycb.../exec`).

---

## 🔗 Passo 4: Conectar ao MamãeGotchi

Você pode conectar a URL de duas formas:

### Opção A: Direto pela Interface do Jogo (Mais Fácil)
1. No cabeçalho do jogo, clique no botão **⭐ Avaliar**.
2. No rodapé do painel de avaliação, clique no ícone de engrenagem ⚙️ **Configurar Planilha Google Sheets**.
3. Cole a URL do aplicativo da Web que você copiou no Passo 3 e clique em **Salvar**.
4. Pronto! A partir desse momento, toda avaliação enviada cairá na sua planilha em tempo real!

### Opção B: No arquivo `.env` (Para Produção)
1. No arquivo `.env` do projeto, adicione a variável:
   ```env
   VITE_FEEDBACK_WEBHOOK_URL=https://script.google.com/macros/s/SUA_URL_AQUI/exec
   ```

---

## 🛡️ Backup Local Automático
Mesmo que a usuária esteja offline ou a URL ainda não tenha sido configurada:
* O MamãeGotchi **salva automaticamente todas as avaliações no armazenamento do dispositivo (`localStorage`)**.
* O pesquisador pode clicar em **"Exportar Avaliações em CSV"** no painel de avaliação para baixar todos os registros salvos a qualquer momento.
