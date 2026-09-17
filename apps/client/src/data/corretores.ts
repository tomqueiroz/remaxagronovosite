/* @section: corretores-dataset */
export type Corretor = {
  id: string
  state: string
  name: string
  phone: string
  phoneHref: string
  email: string
  city: string
  photo: string | null
}

export type BrazilState = {
  uf: string
  name: string
}

export const BRAZIL_STATES: BrazilState[] = [
  {
    "uf": "AC",
    "name": "Acre"
  },
  {
    "uf": "AL",
    "name": "Alagoas"
  },
  {
    "uf": "AP",
    "name": "Amapá"
  },
  {
    "uf": "AM",
    "name": "Amazonas"
  },
  {
    "uf": "BA",
    "name": "Bahia"
  },
  {
    "uf": "CE",
    "name": "Ceará"
  },
  {
    "uf": "DF",
    "name": "Distrito Federal"
  },
  {
    "uf": "ES",
    "name": "Espírito Santo"
  },
  {
    "uf": "GO",
    "name": "Goiás"
  },
  {
    "uf": "MA",
    "name": "Maranhão"
  },
  {
    "uf": "MT",
    "name": "Mato Grosso"
  },
  {
    "uf": "MS",
    "name": "Mato Grosso do Sul"
  },
  {
    "uf": "MG",
    "name": "Minas Gerais"
  },
  {
    "uf": "PA",
    "name": "Pará"
  },
  {
    "uf": "PB",
    "name": "Paraíba"
  },
  {
    "uf": "PR",
    "name": "Paraná"
  },
  {
    "uf": "PE",
    "name": "Pernambuco"
  },
  {
    "uf": "PI",
    "name": "Piauí"
  },
  {
    "uf": "RJ",
    "name": "Rio de Janeiro"
  },
  {
    "uf": "RN",
    "name": "Rio Grande do Norte"
  },
  {
    "uf": "RS",
    "name": "Rio Grande do Sul"
  },
  {
    "uf": "RO",
    "name": "Rondônia"
  },
  {
    "uf": "RR",
    "name": "Roraima"
  },
  {
    "uf": "SC",
    "name": "Santa Catarina"
  },
  {
    "uf": "SP",
    "name": "São Paulo"
  },
  {
    "uf": "SE",
    "name": "Sergipe"
  },
  {
    "uf": "TO",
    "name": "Tocantins"
  }
]

export const CORRETORES: Corretor[] = [
  {
    "id": "corretor-01",
    "state": "BA",
    "name": "Leonil Damascena",
    "phone": "(71) 981584234",
    "phoneHref": "+5571981584234",
    "email": "leonildamascena@remax.com.br",
    "city": "Salvador/BA",
    "photo": null
  },
  {
    "id": "corretor-02",
    "state": "BA",
    "name": "Lorena Deybes Laureano Santos",
    "phone": "(73) 981298384",
    "phoneHref": "+5573981298384",
    "email": "lorenalaureano@remax.com.br",
    "city": "Prado/BA",
    "photo": null
  },
  {
    "id": "corretor-03",
    "state": "BA",
    "name": "Luis Paulo Silva",
    "phone": "(75) 988584595",
    "phoneHref": "+5575988584595",
    "email": "luispaulo.silva@remax.com.br",
    "city": "Santo Antonio de Jesus/BA",
    "photo": null
  },
  {
    "id": "corretor-04",
    "state": "BA",
    "name": "Patrícia Rocha",
    "phone": "(31) 999305077",
    "phoneHref": "+5531999305077",
    "email": "patricia.rocha@remax.com.br",
    "city": "Arraial d’Ajuda - Porto Seguro/BA",
    "photo": null
  },
  {
    "id": "corretor-05",
    "state": "BA",
    "name": "Ana Dark Frota Pereira",
    "phone": "(77) 999989504",
    "phoneHref": "+5577999989504",
    "email": "anadark@remax.com.br",
    "city": "Barreiras/BA",
    "photo": "/images/corretores/web/ana-dark-frota-pereira.webp"
  },
  {
    "id": "corretor-06",
    "state": "BA",
    "name": "Maísa de Souza Regis",
    "phone": "(77) 999712141",
    "phoneHref": "+5577999712141",
    "email": "maisaregis@remax.com.br",
    "city": "Barreiras/BA",
    "photo": "/images/corretores/web/maisa-de-souza-regis.webp"
  },
  {
    "id": "corretor-07",
    "state": "BA",
    "name": "Franco Italo Carvalho Rodrigues",
    "phone": "(74) 999595834",
    "phoneHref": "+5574999595834",
    "email": "francoitallo@remax.com.br",
    "city": "Irecê/BA",
    "photo": "/images/corretores/web/franco-italo-carvalho-rodrigues.webp"
  },
  {
    "id": "corretor-08",
    "state": "BA",
    "name": "José Evanilson de Jesus Andrade",
    "phone": "(75) 988491450",
    "phoneHref": "+5575988491450",
    "email": "evanilsonandrade@remax.com.br",
    "city": "Santo Antonio de Jesus/BA",
    "photo": "/images/corretores/web/jose-evanilson-de-jesus-andrade.webp"
  },
  {
    "id": "corretor-09",
    "state": "CE",
    "name": "Efraim Will Bezerra Cavalcante",
    "phone": "(85) 999847973",
    "phoneHref": "+5585999847973",
    "email": "efraimcavalcante@remax.com.br",
    "city": "Iguatu/CE",
    "photo": "/images/corretores/web/efraim-will-bezerra-cavalcante.webp"
  },
  {
    "id": "corretor-10",
    "state": "DF",
    "name": "Roberto Takaaki Kawashi",
    "phone": "(61) 999320218",
    "phoneHref": "+5561999320218",
    "email": "robertotakaaki@remax.com.br",
    "city": "Brasília/DF",
    "photo": null
  },
  {
    "id": "corretor-11",
    "state": "DF",
    "name": "Delfim da Costa Almeida",
    "phone": "(61) 999114882",
    "phoneHref": "+5561999114882",
    "email": "delfimalmeida@remax.com.br",
    "city": "Brasília/DF",
    "photo": "/images/corretores/web/delfim-da-costa-almeida.webp"
  },
  {
    "id": "corretor-12",
    "state": "DF",
    "name": "Luiz Geraldo de Medeiros",
    "phone": "(61) 991467471",
    "phoneHref": "+5561991467471",
    "email": "lgmedeiros@remax.com.br",
    "city": "Brasília/DF",
    "photo": "/images/corretores/web/luiz-geraldo-de-medeiros.webp"
  },
  {
    "id": "corretor-13",
    "state": "DF",
    "name": "Murilo Botelho Ferreira",
    "phone": "(61) 991126453",
    "phoneHref": "+5561991126453",
    "email": "murilobotelho@remax.com.br",
    "city": "Brasília/DF",
    "photo": "/images/corretores/web/murilo-botelho-ferreira.webp"
  },
  {
    "id": "corretor-14",
    "state": "ES",
    "name": "Hudnei Dias Calmon",
    "phone": "(27) 998040576",
    "phoneHref": "+5527998040576",
    "email": "hudneicalmon@remax.com.br",
    "city": "Vitória/ES",
    "photo": null
  },
  {
    "id": "corretor-15",
    "state": "GO",
    "name": "Ivan Garcia Pires",
    "phone": "(64) 999832011",
    "phoneHref": "+5564999832011",
    "email": "ivanpires@remax.com.br",
    "city": "Caldas Novas/GO",
    "photo": "/images/corretores/web/ivan-garcia-pires.webp"
  },
  {
    "id": "corretor-16",
    "state": "GO",
    "name": "Simone dos Santos Garcia",
    "phone": "(64) 999082011",
    "phoneHref": "+5564999082011",
    "email": "simoneaparecida@remax.com.br",
    "city": "Caldas Novas/GO",
    "photo": "/images/corretores/web/simone-dos-santos-garcia.webp"
  },
  {
    "id": "corretor-17",
    "state": "MG",
    "name": "Sebastian Borrelli",
    "phone": "(34) 998956508",
    "phoneHref": "+5534998956508",
    "email": "sebastianborrelli@remax.com.br",
    "city": "Uberlândia/MG",
    "photo": null
  },
  {
    "id": "corretor-18",
    "state": "MG",
    "name": "Reinaldo Gomes Gonçalves",
    "phone": "(31) 998331000",
    "phoneHref": "+5531998331000",
    "email": "reinaldo.goncalves@remax.com.br",
    "city": "Belo Horizonte/MG",
    "photo": "/images/corretores/web/reinaldo-gomes-goncalves.webp"
  },
  {
    "id": "corretor-19",
    "state": "MG",
    "name": "Lélio Gimenez Garcia",
    "phone": "(31) 999530883",
    "phoneHref": "+5531999530883",
    "email": "leliogarcia@remax.com.br",
    "city": "Belo Horizonte/MG",
    "photo": "/images/corretores/web/lelio-gimenez-garcia.webp"
  },
  {
    "id": "corretor-20",
    "state": "MG",
    "name": "Zulmira Ribeiro Diniz",
    "phone": "(31) 998238996",
    "phoneHref": "+5531998238996",
    "email": "zulmiraribeiro@remax.com.br",
    "city": "Belo Horizonte/MG",
    "photo": "/images/corretores/web/zulmira-ribeiro-diniz.webp"
  },
  {
    "id": "corretor-21",
    "state": "MG",
    "name": "Carlos Alberto Aarestrup Netto",
    "phone": "(32) 999288390",
    "phoneHref": "+5532999288390",
    "email": "betoaarestrup@gmail.com",
    "city": "Juiz de Fora/MG",
    "photo": "/images/corretores/web/carlos-alberto-aarestrup-netto.webp"
  },
  {
    "id": "corretor-22",
    "state": "MG",
    "name": "Marcos Gonçalves",
    "phone": "(35) 999977102",
    "phoneHref": "+5535999977102",
    "email": "marcosgoncalves@remax.com.br",
    "city": "Poços de Caldas/MG",
    "photo": "/images/corretores/web/marcos-goncalves.webp"
  },
  {
    "id": "corretor-23",
    "state": "MG",
    "name": "Carolina Magalhães Souza",
    "phone": "(35) 998545888",
    "phoneHref": "+5535998545888",
    "email": "carolinamagalhaes@remax.com.br",
    "city": "Poços de Caldas/MG",
    "photo": "/images/corretores/web/carolina-magalhaes-souza.webp"
  },
  {
    "id": "corretor-24",
    "state": "MT",
    "name": "André Roos",
    "phone": "(66) 984487204",
    "phoneHref": "+5566984487204",
    "email": "andreroos@remax.com.br",
    "city": "Confresa/MT",
    "photo": null
  },
  {
    "id": "corretor-25",
    "state": "MT",
    "name": "Andreya Ferreira dos Santos",
    "phone": "(66) 996922979",
    "phoneHref": "+5566996922979",
    "email": "andreyaroos@remax.com.br",
    "city": "Confresa/MT",
    "photo": null
  },
  {
    "id": "corretor-26",
    "state": "MT",
    "name": "Cacá Zambardino",
    "phone": "(66) 999888839",
    "phoneHref": "+5566999888839",
    "email": "carloszambardino@remax.com.br",
    "city": "Rondonópolis/MT",
    "photo": null
  },
  {
    "id": "corretor-27",
    "state": "MT",
    "name": "Epaminondas Júnior",
    "phone": "(66) 999843695",
    "phoneHref": "+5566999843695",
    "email": "epaminondasoliveira@remax.com.br",
    "city": "Rondonópolis/MT",
    "photo": null
  },
  {
    "id": "corretor-28",
    "state": "MT",
    "name": "Reginaldo Barbosa de Moraes",
    "phone": "(66) 999846994",
    "phoneHref": "+5566999846994",
    "email": "reginaldomoraes@remax.com.br",
    "city": "Barra do Garças/MT",
    "photo": null
  },
  {
    "id": "corretor-29",
    "state": "MT",
    "name": "Guilherme Guimarães Vilela",
    "phone": "(66) 999839196",
    "phoneHref": "+5566999839196",
    "email": "guilhermevilela@remax.com.br",
    "city": "Barra do Garças/MT",
    "photo": "/images/corretores/web/guilherme-guimaraes-vilela.webp"
  },
  {
    "id": "corretor-30",
    "state": "MT",
    "name": "Luiz Felipe Porto de Szechy",
    "phone": "(66) 999769707",
    "phoneHref": "+5566999769707",
    "email": "felipeszechy@remax.com.br",
    "city": "Barra do Garças/MT",
    "photo": "/images/corretores/web/luiz-felipe-porto-de-szechy.webp"
  },
  {
    "id": "corretor-31",
    "state": "MT",
    "name": "Marcelo da Silva",
    "phone": "(66) 999882009",
    "phoneHref": "+5566999882009",
    "email": "marcelodsilva@remax.com.br",
    "city": "Rondonópolis/MT",
    "photo": "/images/corretores/web/marcelo-da-silva.webp"
  },
  {
    "id": "corretor-32",
    "state": "PA",
    "name": "Bruno Ribeiro Lopes",
    "phone": "(91) 984129149",
    "phoneHref": "+5591984129149",
    "email": "brunolopes@remax.com.br",
    "city": "Belém/PA",
    "photo": "/images/corretores/web/bruno-ribeiro-lopes.webp"
  },
  {
    "id": "corretor-33",
    "state": "PA",
    "name": "André Carloto do Nascimento",
    "phone": "(91) 992406157",
    "phoneHref": "+5591992406157",
    "email": "andrecarloto@remax.com.br",
    "city": "Paragominas/PA",
    "photo": "/images/corretores/web/andre-carloto-do-nascimento.webp"
  },
  {
    "id": "corretor-34",
    "state": "PE",
    "name": "Sandro Giovanni Garcia Leite",
    "phone": "(87) 988359000",
    "phoneHref": "+5587988359000",
    "email": "sandrogarcia@remax.com.br",
    "city": "Petrolina/PE",
    "photo": "/images/corretores/web/sandro-giovanni-garcia-leite.webp"
  },
  {
    "id": "corretor-35",
    "state": "PR",
    "name": "Rafael Soriani",
    "phone": "(43) 999034444",
    "phoneHref": "+5543999034444",
    "email": "rafaelsoriani@remax.com.br",
    "city": "Londrina/PR",
    "photo": null
  },
  {
    "id": "corretor-36",
    "state": "PR",
    "name": "Rodolfo Flenik",
    "phone": "(41) 998006032",
    "phoneHref": "+5541998006032",
    "email": "rodolfoflenik@remax.com.br",
    "city": "União da Vitória/PR",
    "photo": null
  },
  {
    "id": "corretor-37",
    "state": "PR",
    "name": "Fernando Machado Faria dos Santos",
    "phone": "(41) 991013226",
    "phoneHref": "+5541991013226",
    "email": "fernandofaria@remax.com.br",
    "city": "Curitiba/PR",
    "photo": "/images/corretores/web/fernando-machado-faria-dos-santos.webp"
  },
  {
    "id": "corretor-38",
    "state": "RO",
    "name": "Vinicius Dias Ramos",
    "phone": "(69) 992591516",
    "phoneHref": "+5569992591516",
    "email": "viniciusdias@remax.com.br",
    "city": "Porto Velho/RO",
    "photo": null
  },
  {
    "id": "corretor-39",
    "state": "RS",
    "name": "Alcindo Michael dos Santos",
    "phone": "(54) 996084417",
    "phoneHref": "+5554996084417",
    "email": "alcindodossantos@remax.com.br",
    "city": "Trindade do Sul/RS",
    "photo": null
  },
  {
    "id": "corretor-40",
    "state": "RS",
    "name": "Vinicios Leite",
    "phone": "(55) 991066092",
    "phoneHref": "+5555991066092",
    "email": "viniciosleite@remax.com.br",
    "city": "São Gabriel/RS",
    "photo": null
  },
  {
    "id": "corretor-41",
    "state": "RS",
    "name": "Edilberto Stein de Quadros",
    "phone": "(55) 999358787",
    "phoneHref": "+5555999358787",
    "email": "edilbertoquadros@remax.com.br",
    "city": "Santa Maria/RS",
    "photo": "/images/corretores/web/edilberto-stein-de-quadros.webp"
  },
  {
    "id": "corretor-42",
    "state": "SC",
    "name": "Osmair Zequiel da Cruz",
    "phone": "(47) 992583585",
    "phoneHref": "+5547992583585",
    "email": "osmairdacruz@remax.com.br",
    "city": "Indaial/SC",
    "photo": "/images/corretores/web/osmair-zequiel-da-cruz.webp"
  },
  {
    "id": "corretor-43",
    "state": "SC",
    "name": "Jones Henrique Canova",
    "phone": "(49) 988470587",
    "phoneHref": "+5549988470587",
    "email": "jonescanova@remax.com.br",
    "city": "Ipuaçu/SC",
    "photo": "/images/corretores/web/jones-henrique-canova.webp"
  },
  {
    "id": "corretor-44",
    "state": "SC",
    "name": "André Luís Bissacot",
    "phone": "(49) 991971208",
    "phoneHref": "+5549991971208",
    "email": "andrebissacot@remax.com.br",
    "city": "Joaçaba/SC",
    "photo": "/images/corretores/web/andre-luis-bissacot.webp"
  },
  {
    "id": "corretor-45",
    "state": "SC",
    "name": "Eduardo Farias",
    "phone": "(49) 991862111",
    "phoneHref": "+5549991862111",
    "email": "eduardofarias@remax.com.br",
    "city": "Lages/SC",
    "photo": "/images/corretores/web/eduardo-farias.webp"
  },
  {
    "id": "corretor-46",
    "state": "SC",
    "name": "Matheus de Souza de Macedo",
    "phone": "(49) 998084228",
    "phoneHref": "+5549998084228",
    "email": "matheusdemacedo@remax.com.br",
    "city": "Lages/SC",
    "photo": "/images/corretores/web/matheus-de-souza-de-macedo.webp"
  },
  {
    "id": "corretor-47",
    "state": "SP",
    "name": "Angel Cáceres",
    "phone": "(16) 996239696",
    "phoneHref": "+5516996239696",
    "email": "angelcaceres@remax.com.br",
    "city": "Ribeirão Preto/SP",
    "photo": null
  },
  {
    "id": "corretor-48",
    "state": "SP",
    "name": "Caio Fonseca",
    "phone": "(16) 993533420",
    "phoneHref": "+5516993533420",
    "email": "caiofonseca@remax.com.br",
    "city": "Ribeirão Preto/SP",
    "photo": null
  },
  {
    "id": "corretor-49",
    "state": "SP",
    "name": "Daniel Ragazzo Castro",
    "phone": "(19) 993195652",
    "phoneHref": "+5519993195652",
    "email": "dcastro@remax.com.br",
    "city": "Araras/SP",
    "photo": null
  },
  {
    "id": "corretor-50",
    "state": "SP",
    "name": "Danilo França de Oliveira",
    "phone": "(16) 991872761",
    "phoneHref": "+5516991872761",
    "email": "danilofranca@remax.com.br",
    "city": "Ribeirão Preto/SP | Delfinópolis/MG",
    "photo": null
  },
  {
    "id": "corretor-51",
    "state": "SP",
    "name": "Fabinho Said",
    "phone": "(16) 981130404",
    "phoneHref": "+5516981130404",
    "email": "fabinhosaid@remax.com.br",
    "city": "Ribeirão Preto/SP",
    "photo": null
  },
  {
    "id": "corretor-52",
    "state": "SP",
    "name": "Fernanda Reiko Passerotti Calhau",
    "phone": "(11) 939514334",
    "phoneHref": "+5511939514334",
    "email": "fernandareiko@remax.com.br",
    "city": "São João da Boa Vista/SP",
    "photo": null
  },
  {
    "id": "corretor-53",
    "state": "SP",
    "name": "Gustavo Antunes",
    "phone": "(14) 991681001",
    "phoneHref": "+5514991681001",
    "email": "gustavoantunes@remax.com.br",
    "city": "Botucatu/SP",
    "photo": null
  },
  {
    "id": "corretor-54",
    "state": "SP",
    "name": "Leiser Magalhães Boldrin",
    "phone": "(19) 997733553",
    "phoneHref": "+5519997733553",
    "email": "leiserboldrin@remax.com.br",
    "city": "Campinas/SP",
    "photo": null
  },
  {
    "id": "corretor-55",
    "state": "SP",
    "name": "Lilian Antonia Alves Batista",
    "phone": "(19) 992268025",
    "phoneHref": "+5519992268025",
    "email": "lilianalves@remax.com.br",
    "city": "Mogi Guaçu/SP",
    "photo": null
  },
  {
    "id": "corretor-56",
    "state": "SP",
    "name": "Marcelo Alvares Cruz",
    "phone": "(16) 992351513",
    "phoneHref": "+5516992351513",
    "email": "marcelocruz@remax.com.br",
    "city": "Araraquara/SP",
    "photo": null
  },
  {
    "id": "corretor-57",
    "state": "SP",
    "name": "Mauricio Gentile Fachini",
    "phone": "(19) 981219043",
    "phoneHref": "+5519981219043",
    "email": "mauricio.fachini@remax.com.br",
    "city": "Araras/SP",
    "photo": null
  },
  {
    "id": "corretor-58",
    "state": "SP",
    "name": "Roberto Lima Ferraz Rosa",
    "phone": "(16) 992625659",
    "phoneHref": "+5516992625659",
    "email": "robertorosa@remax.com.br",
    "city": "Ribeirão Preto/SP",
    "photo": null
  },
  {
    "id": "corretor-59",
    "state": "SP",
    "name": "Júlio César Soares de Magalhães",
    "phone": "(19) 997584596",
    "phoneHref": "+5519997584596",
    "email": "juliocesarmagalhaes@remax.com.br",
    "city": "Jaboticabal/SP",
    "photo": "/images/corretores/web/julio-cesar-soares-de-magalhaes.webp"
  },
  {
    "id": "corretor-60",
    "state": "SP",
    "name": "Edione Neri Ferreira",
    "phone": "(19) 996062146",
    "phoneHref": "+5519996062146",
    "email": "edioneferreira@remax.com.br",
    "city": "Mogi Guaçu/SP",
    "photo": "/images/corretores/web/edione-neri-ferreira.webp"
  },
  {
    "id": "corretor-61",
    "state": "SP",
    "name": "Flávio José de Sousa Pereira",
    "phone": "(19) 997446632",
    "phoneHref": "+5519997446632",
    "email": "flaviospereira@remax.com.br",
    "city": "Piracicaba/SP",
    "photo": "/images/corretores/web/flavio-jose-de-sousa-pereira.webp"
  },
  {
    "id": "corretor-62",
    "state": "SP",
    "name": "Ricardo Marques Schermack",
    "phone": "(11) 993275353",
    "phoneHref": "+5511993275353",
    "email": "ricardoschermack@remax.com.br",
    "city": "Registro/SP",
    "photo": "/images/corretores/web/ricardo-marques-schermack.webp"
  },
  {
    "id": "corretor-63",
    "state": "SP",
    "name": "Eduardo Callera Pedrosa",
    "phone": "(13) 981556067",
    "phoneHref": "+5513981556067",
    "email": "eduardocallera@remax.com.br",
    "city": "Registro/SP",
    "photo": "/images/corretores/web/eduardo-callera-pedrosa.webp"
  },
  {
    "id": "corretor-64",
    "state": "SP",
    "name": "Marcel Salgueiro Rodrigues Violante",
    "phone": "(35) 997558883",
    "phoneHref": "+5535997558883",
    "email": "marcelviolante@remax.com.br",
    "city": "Ribeirão Preto/SP",
    "photo": "/images/corretores/web/marcel-salgueiro-rodrigues-violante.webp"
  },
  {
    "id": "corretor-65",
    "state": "SP",
    "name": "Walter Guida",
    "phone": "(35) 999619731",
    "phoneHref": "+5535999619731",
    "email": "walterguida@remax.com.br",
    "city": "Lindóia/SP",
    "photo": "/images/corretores/web/walter-guida.webp"
  },
  {
    "id": "corretor-66",
    "state": "SP",
    "name": "José Carlos do Prado Júnior",
    "phone": "(16) 999914090",
    "phoneHref": "+5516999914090",
    "email": "josedoprado@remax.com.br",
    "city": "Ribeirão Preto/SP",
    "photo": "/images/corretores/web/jose-carlos-do-prado-junior.webp"
  },
  {
    "id": "corretor-67",
    "state": "TO",
    "name": "Victor Luiz Borges da Silva",
    "phone": "(63) 999427189",
    "phoneHref": "+5563999427189",
    "email": "victorborges@remax.com.br",
    "city": "Araguaína/TO",
    "photo": null
  }
]

export const CORRETORES_BY_STATE = CORRETORES.reduce<Record<string, Corretor[]>>((groups, corretor) => {
  const current = groups[corretor.state] ?? []
  current.push(corretor)
  groups[corretor.state] = current
  return groups
}, {})

export const COVERED_STATES = new Set(Object.keys(CORRETORES_BY_STATE))
