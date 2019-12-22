# API COM SEQUELIZE NO NODE

## Migrations

### Criar Migrations

```bash
    yarn sequelize migration:create --name=nome-da-migration
```

Geralmente se dá um nome que a migration faz. Por exemplo: create-user, update-users-change-name e etc.

### Executar Migrations

```zsh
    # Executa as migrations (método up):
    yarn sequelize db:migrate
    # Desfaz a última migration (método down):
    yarn sequelze db:migrate:undo
```

Caso seja necessário alterar alguma coisa dentro de um ambiente de produção, o ideal é criar uma nova migration que altera as coisas pra você, e não ficar dando undo até chegar na alteração desejada.
