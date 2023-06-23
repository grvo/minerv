# configuração de pipeline

<!-- veja as pipelines para o projeto minerv: https://docs.gitlab.com/ee/development/pipelines -->
<!-- quando se estiver em dúvida sobre a mudança de configuração de pipeline, então pingue @gl-quality/eng-prod. -->

## o que esse mr faz?

<!-- brevemente descreve o que esse mr trata sobre -->

## problemas relacionados

<!-- linkagem de problemas relacionados abaixo. -->

## checklist

### pre-merge

considere o efeito das mudanças neste merge request no seguinte:

- [ ] diferente [tipos de pipeline](https://docs.gitlab.com/ee/development/pipelines/index.html#pipelines-types-for-merge-requests)
- projetos não-canônicos:
  - [ ] `gitlab-foss`
  - [ ] `security`
  - [ ] `dev`
  - [ ] forks pessoais
- [ ] [performance de pipeline](https://about.gitlab.com/handbook/engineering/quality/performance-indicators/#average-merge-request-pipeline-duration-for-gitlab)

**caso novos jobs sejam adicionados:**

- [ ] regras relacionadas a mudanças (mudanças de arquivo frontend/backend/database): _____
- [ ] frequência em que estão rodando (mrs, branch principal, nightly, bi-hourly): _____
- [ ] adição de uma duração para https://app.periscopedata.com/app/gitlab/652085/Engineering-Productivity---Pipeline-Build-Durations caso tenha-se novos jobs adicionados em pipelines de merge request

isso irá ajudar em manter um track do aumento de custo esperado para o [custo aproximado de pipeline por merge request do projeto minerv](https://about.gitlab.com/handbook/engineering/quality/performance-indicators/#gitlab-project-average-pipeline-cost-per-merge-request) rpi

### post-merge

- [ ] considere comunicar essas mudanças para o seguinte time broader da [guia de comunicação das mudanças de pipeline](https://about.gitlab.com/handbook/engineering/quality/engineering-productivity/#pipeline-changes)

/label ~"maintenance::pipelines" ~"produtividade de engenharia"
