# documentação de arquivos de configuração

note que a maioria dos arquivos de configuração (`config/*.*`) commitatados em [gitlab-foss](https://gitlab.com/gitlab-org/gitlab-foss) **não serão utilizados** para [omnibus-gitlab](https://gitlab.com/gitlab-org/omnibus-gitlab). arquivos de configuração committados em gitlab-foss são apenas utilizados para desenvolvimento.

## gitlab.yml

você pode encontrar a maioria dos arquivos de configuração aqui.

## mail_room.yml

esse arquivo é na verdade um yml capturado dentro de um arquivo erb para habilitar valores já em templates para serem especificados de `gitlab.yml`. mail_room carrega esse arquivo primeiro como um arquivo erb e então, inicializa o yml resultante.

## resque.yml

esse arquivo é chamado `resque.yml` por razões históricas. **não** é utilizado resque por enquanto. é utilizado para especificar configuração redis quando um banco de dados único do redis é sonhado.
