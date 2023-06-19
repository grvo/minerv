# esse dockerfile instala um binário compilado para um sistema bare.
#
# você precisa dar um commit no binário compilado no controle de fonte (nao recomendado)
# ou construir o binário primeiramente por meio de pipelines ci/cd

FROM alpine:3.5

# preferencialmente adicionar certificados com ssl no root
RUN apk --no-cache add ca-certificates

WORKDIR /usr/local/bin

# mudar app pelo que quer que o binário se chame
Add app .

CMD ["./app"]
