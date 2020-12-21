# covid.node
This is a simple project to consume API Brasil.io.

### Requirements
- [x] Expor uma API que recebe um intervalo de datas (leva-se em conta a data de início e de fim) e um estado. Ex: http://localhost?state=PR&dateStart=2020-05-10&dateEnd=2020-05-18;
  
- [x] Consumir as informações do WebService sobre casos de Covid19 disponível no endereço [Brasil.IO](https://brasil.io/api/dataset/covid19/caso/data/);

- [x] Pegar as top 10 cidades com maior percentual de casos em relação a população total da cidade no período;

- [x] Após filtrar as informações desejadas, fazer um POST para cada posição;

- [x] Subir o projeto em um repositório Git público;

### How to use it

- First, install dependencies using ```npm install```;
- Make sure you have:
    - api access key Brasil.io;
    - api Nuvem post
- For last, create a ```.env``` and put inside:
```.env
PORT=<PORT_API>

BRASILIO_URL=<URL API Brasil.IO>
BRASILIO_APIKEY=<Api access Key Brasil.IO>

NUVEM_URL=<URL Nuvem API>
NUVEM_NAME=<Your Name>
```

### Referencies
* Dependencies
    * [Axios](https://www.npmjs.com/package/axios)
    * [Body-Parser](https://www.npmjs.com/package/body-parser)
    * [Dotenv](https://www.npmjs.com/package/dotenv)
    * [Express](https://www.npmjs.com/package/express)
    * [Moment](https://www.npmjs.com/package/moment)
* Documentation Services
    * [Brasil.IO](https://blog.brasil.io/2020/10/31/nossa-api-sera-obrigatoriamente-autenticada/)
    * [Nuvem](https://mestra.org/)

### Author
[chicofariasneto](https://github.com/chicofariasneto)