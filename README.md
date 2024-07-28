# React + TypeScript + Vite

- Configuração do BIOME para Formatação de Código
  - Este projeto utiliza o BIOME para a formatação de código.
  - Para garantir que o BIOME funcione corretamente na sua máquina, siga os passos abaixo:

- Desative Outros Formatadores:
  - Desative quaisquer outros formatadores de código que você possa ter instalados na sua máquina.
  - Isso evitará conflitos e garantirá que o BIOME seja o único formatador ativo.
    
- Instale a Extensão do BIOME:
  - Instale a extensão do BIOME no seu editor de código (por exemplo, VS Code).
  - Você pode encontrar a extensão na Visual Studio Code Marketplace.
    
- Configure o BIOME como Formatador Padrão:

  - Vá até as configurações do seu editor (Settings).
    - Defina o BIOME como o formatador padrão.
    - Para fazer isso, você pode procurar por "default formatter" nas configurações e selecionar biomejs.biome.
    
  - Ajustes Adicionais nas Configurações:
    - Para garantir que o BIOME aplique correções rápidas automaticamente ao salvar, adicione as seguintes linhas ao arquivo settings.json do seu editor.
    - Para acessar o arquivo settings.json, procure por "Edit in settings.json" nas configurações do editor:
 
    
      {
        "editor.codeActionsOnSave": {
          "quickfix.biome": "explicit"
        },
        "editor.defaultFormatter": "biomejs.biome"
      }
      

- Seguindo esses passos, você garante que o BIOME seja o único formatador ativo no seu ambiente de desenvolvimento, proporcionando uma experiência de formatação de código consistente e eficiente.

