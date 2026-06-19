# Novo App RJ - Mockup Interativo

Protótipo estático navegável para testar a experiência proposta do novo aplicativo do associado do Recreio da Juventude.

## Como executar

```bash
cd /home/fabricio/fab/workspace/orca/workspaces/recreio-da-juventude/mockup/mobile/mockup
python3 -m http.server 4173
```

Abra `http://localhost:4173/` para a pagina de entrada ou `http://localhost:4173/v1/` para abrir direto o mockup v1.

## Login

Use qualquer CPF, matrícula ou e-mail e qualquer senha. O formulário vem preenchido com os dados de sandbox documentados em `mobile/legacy/login.md`, mas a autenticação é mockada.

## Fluxos clicáveis

- Login e recuperação de senha mockada.
- Home orientada a tarefas com atalhos editáveis.
- Central de reservas com stepper, convidados, termo e comprovante.
- Pagamentos com boleto, cartão e status transacional.
- Eventos com compra de ingresso e QR.
- Carteirinha digital, QR e código de acesso temporário.
- Serviços, lista de espera e rematrícula.
- Academia, treino em PDF e avaliação física.
- Convênio interclubes e geração de carta.
- Mapa do clube, notificações, conta, dependentes, visitantes e atendimento.

## Fontes de design

- Documento: `mobile/docs/rj-mobile-app-design-doc.md`.
- APK legado: `mobile/legacy/RJ-Sandbox-Convenios-5.2.1.apk`.
- Assets extraídos do APK: logos, fontes Barlow/Lato, imagens de home e mapa.
