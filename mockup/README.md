# Mockups do App RJ

Este diretório tem duas versoes do prototipo:

- `v1/`
- `v2/`

## Como rodar localmente

```bash
cd /home/fabricio/fab/workspace/orca/workspaces/recreio-da-juventude/mockup/mobile/mockup
python3 -m http.server 4173
```

Abra:

- `http://localhost:4173/` para a pagina inicial com links para as duas versoes
- `http://localhost:4173/v1/` para o mockup v1
- `http://localhost:4173/v2/` para o mockup v2

## Observacoes

- Nao ha backend.
- Os assets sao relativos a cada pasta, entao as duas versoes funcionam a partir do proprio diretorio.
- Se quiser apresentar para alguem, a raiz `http://localhost:4173/` evita ficar digitando os caminhos das versoes.
