FROM golang:alpine3.15 AS builder

WORKDIR /src/codeeducation
RUN go mod init codeeducation
COPY codeeducation.go .
RUN go build

FROM scratch
COPY --from=builder /src/codeeducation/codeeducation /
CMD [ "./codeeducation" ]