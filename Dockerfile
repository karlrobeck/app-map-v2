FROM oven/bun:alpine as bun-builder

WORKDIR /app

COPY . .

RUN bun install

RUN bun run build

FROM golang:alpine3.20 AS go-builder

WORKDIR /app

COPY . .

RUN go mod tidy

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app cmd/main.go

FROM alpine:latest as runtime

RUN apk --no-cache add ca-certificates

WORKDIR /root/

COPY --from=go-builder /app .
COPY --from=bun-builder /app/dist /root/dist

CMD [ "./app","serve","--http=0.0.0.0:8090","--dir=/root/data/pb_data" ]

EXPOSE 8090