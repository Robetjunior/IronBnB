require('dotenv').config();
const mongoose = require('mongoose');
const Host = require('../models/Host.model');

require('../configs/db.config');

const host = [

    {local: 'Monte Verde', title: 'Chalé inteiro', imgPath: 'https://res.cloudinary.com/dbkdezs4y/image/upload/v1594934925/host/chaleMonteVerde_yopvov.webp',espaco: 'Espaco inteiro', qntHosp: 4, preco: 250, comodidades:['Chaleira', 'Wifi', 'Almoço', 'Jacuzzi'], descricao: "Aconchegante e charmoso, o Recanto Omi é o lugar perfeito para quem procura um lugar de descanço e contato com a natureza. Localizado a 500m da rua principal de Monte Verde, conta com arquitetura e detalhes típicos europeus, o que proporciona uma atmosfera extremamente familiar e acolhedora."},
    {local: 'Monte Verde', title: 'Chalé dos Alpes', imgPath: 'https://res.cloudinary.com/dbkdezs4y/image/upload/v1594934923/host/chaleAlpes_psj8sy.webp',espaco: 'Espaco inteiro', qntHosp: 5, preco: 220, comodidades:['Chaleira', 'Wifi', 'Almoço', 'Jacuzzi'],descricao: "Tenha dias adoráveis no Chalés do alpes , em um espaço 4000mil metros de puro ar limpo com bela vista para o pico do selado , um lugar aconchegante e calmo onde vc se conecta a natureza , clima fresco e acolhedor estando vc em casal ou familia , o chalé se encontra dentro do distrito de Monte verde , a 1000 metros da rua principal, em um local calmo e tranquilo ."},
    {local: 'Monte Verde', title: 'Casa na Árvore nas Montanhas', imgPath: 'https://res.cloudinary.com/dbkdezs4y/image/upload/v1594934926/host/casaArvore_oynqnj',espaco: 'Quarto inteiro', qntHosp: 4, preco: 350, comodidades:['Chaleira', 'Wifi', 'Almoço', 'Jacuzzi'],descricao: "Não quebramos Finais de Semana (sex. a dom.). Caso deseje o período de Quinta a Sábado ou de Sábado a Segunda, o valor será o mesmo do Final de Semana comum (sex. a dom.); neste caso é preciso antes solicitar o valor por mensagem, pois o Airbnb não calcula corretamente."},
    {local: 'Monte Verde', title: 'Casa Araucária', imgPath: 'https://res.cloudinary.com/dbkdezs4y/image/upload/v1594934923/host/casaAraucaria_xcomn9.jpg',espaco: 'Quarto inteiro', qntHosp: 4, preco: 230, comodidades:['Chaleira', 'Wifi', 'Almoço', 'Jacuzzi'],descricao: "Durante a pandemia aceitaremos apenas reservas de pessoas da mesma família. A casa estará perfeitamente limpa e arejada, vocês irão sentir-se seguros e em casa. A 800 m da Av. Monte Verde, rua tranquila, TV 191 canais, Wifi, bicicletas, aquecimento solar da piscina e da banheira, 3 suítes, lavabo, lareira na sala. Roupa de cama e banho é opcional (ver preços). As diárias variam com o número de pessoas, época, dia da semana, com descontos progressivos a partir de 3 dias de locação."},
    {local: 'Monte Verde', title: 'Monte Verde-Casa', imgPath: 'https://res.cloudinary.com/dbkdezs4y/image/upload/v1594934923/host/casaVerde_nvlivc.webp',espaco: 'Quarto inteiro', qntHosp: 2, preco: 277, comodidades:['Chaleira', 'Wifi', 'Almoço', 'Jacuzzi'],descricao: "Charmosa casa aconchegante cercada por um grande gramado e jardim com dois dormitórios, um banheiro completo, sala de estar com lareira, sala de jantar, cozinha completa e terraço. Rua tranquila em área nobre próxima a Av. Principal de Monte Verde, com fácil acesso às lojas e restaurantes. Garagem privativa e wi-fi gratuito."},

    {local: 'Campos do Jordão', title: 'Chalé inteiro', imgPath: 'https://res.cloudinary.com/dbkdezs4y/image/upload/v1594934928/host/chaleCampoJordao_acg1mr.webp',espaco: 'Quarto inteiro', qntHosp: 4, preco: 106, comodidades:['Chaleira', 'Wifi', 'Almoço', 'Jacuzzi'],descricao: "O Chalé é grande, lugar simples aconchegante, no estilo rústico, local totalmente seguro, com uma sala grande, TV com canais em HD Tele Cine, HBO, Mesa de Jantar, 1 quarto na parte de baixo e 2 na parte superior, todos com cama de casal, podendo ser locado para até 10 pessoas, sala com Lareira, sofa cama, cozinha, localizado em um bairro tranquilo e com muita natureza. Localizado a 3,4 km do centro turístico Capivari, estrada de asfalto, apenas 100 metros de terra antes de chegar no Chalé."},
    {local: 'Campos do Jordão', title: 'Cabana inteira', imgPath: 'https://res.cloudinary.com/dbkdezs4y/image/upload/v1594934923/host/chaleAlpes_psj8sy.webp',espaco: 'Quarto inteiro', qntHosp: 4, preco: 290, comodidades:['Chaleira', 'Wifi', 'Almoço', 'Jacuzzi'],descricão: "Estamos localizados no centro turistico de Campos, onde a 1500 metros vc chega ao centro Capivari e teleférico, a 400 as chocolaterias Spinasi e Cacau Show entre outras, Shopping Container, Rodoviária e um centro comercial com os melhores Supermercados e outros da cidade."},
    {local: 'Campos do Jordão', title: 'Casa na Árvore nas Montanhas', imgPath: 'https://res.cloudinary.com/dbkdezs4y/image/upload/v1594934928/host/flatCampo_xdfeqv.webp',espaco: 'Quarto inteiro', qntHosp: 2, preco: 353,comodidades:['Chaleira', 'Wifi', 'Almoço', 'Jacuzzi'], descricão: "Apartamento decorado em condomínio com sala de ginástica, piscina, quadras poliesportiva, comodidade de hotel 4/5 estrelas, estacionamento com manobrista, restaurantes, no Alto do Capivari perto dos principais pontos turísticos. Apt com lareira e tvs (acesso à Netflix). Wi-Fi incluso."},
    {local: 'Campos do Jordão', title: 'Vila Báltica - Chalé', imgPath: 'https://res.cloudinary.com/dbkdezs4y/image/upload/v1594934931/host/vilaChale_vid37s.webp',espaco: 'Quarto inteiro', qntHosp: 3, preco: 268, comodidades:['Chaleira', 'Wifi', 'Almoço', 'Jacuzzi'],descricão: "Uma simpática e descontraída vila com 5 casinhas rústicas e aconchegantes, em um pátio comum, a apenas 2 km de Capivari, o centrinho de Campos.A casa tem sala-cozinha integrada, banheiro e mezanino com cama de casal. Equipada e confortável, conta com diversos itens para proporcionar o máximo de bem-estar e praticidade."},
    {local: 'Campos do Jordão', title: 'Chalé inteiro rosa', imgPath: 'https://res.cloudinary.com/dbkdezs4y/image/upload/v1594934925/host/chaleRosa_mdpjgk.webp',espaco: 'Quarto inteiro', qntHosp: 2, preco: 102, comodidades:['Chaleira', 'Wifi', 'Almoço', 'Jacuzzi'],descricao: "Chalé Rústico simples, ambiente interno sem divisórias, lareira, frigobar, Microondas, cafeteira, sanduicheira, Wi-Fi, TV, Dvd, Sky, sofá, roupa de cama, cama de casal, são 3 chalés no local, cada um a parte do outro, local com muita árvore tranquilo ideal para descanso e casais, há 9 minutos de carro do Centro, cabem 4 pessoas. "},

    {local: 'Osasco', title: 'Studio moderno', imgPath: 'https://res.cloudinary.com/dbkdezs4y/image/upload/v1594934930/host/studioOsasco_y3tav9.webp',espaco: 'Espaco inteiro', qntHosp: 2, preco: 106, comodidades:['Wifi', 'Cabide',],descricao: "Estúdio completo e confortável, prédio novíssimo com excelentes instalações, fica no 5 andar apto. Local ideal para quem vem a lazer ou trabalho e ao lado da estação de metrô."},
    {local: 'Osasco', title: 'Apartamento Flat', imgPath: 'https://res.cloudinary.com/dbkdezs4y/image/upload/v1594934922/host/aptoOsasco_koyzmo.webp',espaco: 'Espaco inteiro', qntHosp: 1, preco: 120, comodidades:['Wifi', 'Cabide',],descricao: "O Flat está Localizado próxima aos Shopping no centro de Osasco Mercados, Estação Metro, Hospitais de fácil acesso"},
    {local: 'Osasco', title: 'The Cittyplex', imgPath: 'https://res.cloudinary.com/dbkdezs4y/image/upload/v1594934927/host/citOsasco_nj2swv.webp',espaco: 'Quarto compartilhado', qntHosp: 1, preco: 104, comodidades:['Wifi', 'Cabide',],descricao: "Pertíssimo do Super Shopping, Shopping União, diversos mercados, estação de trem etc! Fácil acesso às Marginais"},
    {local: 'Osasco', title: 'Apartamento', imgPath: 'https://res.cloudinary.com/dbkdezs4y/image/upload/v1594934921/host/apto2Osasco_p1vbob.webp',espaco: 'Quarto inteiro', qntHosp: 3, preco: 117, comodidades:['Wifi', 'Cabide',],descricao: "Acabamento impecável e localização privilegiada (a 4 min á pé da estação Osasco).Proxímo a shoppings, hipermercados, farmácia, hospitais, bancos; possivel acessar todas ás comodidades citadas à pé. Proxímo á rodovias principais como Castelo Branco, Rodoanel, Raposo Tavares e Marginais."},
    {local: 'Osasco', title: 'Quarto inteiro', imgPath: 'https://res.cloudinary.com/dbkdezs4y/image/upload/v1594934929/host/quartoOsasco_apptqm.webp',espaco: 'Quarto inteiro', qntHosp: 1, preco: 54, comodidades:['Wifi', 'Cabide',],descricao: "Suite em um prédio de 4 andares, o 4º é uma residência. A suíte fica no 3º andar."},

    {local: 'Santa Catarina', title: 'Chalé Rubi', imgPath: 'https://res.cloudinary.com/dbkdezs4y/image/upload/v1594934926/host/chaleRubi_t4uicg.webp',espaco: 'Espaco inteiro', qntHosp: 2, preco: 500,comodidades:['Chaleira', 'Wifi', 'Almoço', 'Jacuzzi'], descricao: "O chalé Rubi foi construído buscando oferecer conforto e tranquilidade aos hóspedes em um ambiente acolhedor em meio à natureza.Possui lareira, deck, hidromassagem com teto e laterais de vidro, com uma vista deslumbrante, cercado por pomar e horta orgânicos ."},
    {local: 'Santa Catarina', title: 'Loft Estiloso', imgPath: 'https://res.cloudinary.com/dbkdezs4y/image/upload/v1594934931/host/loftSanta_sum9xp.webp',espaco: 'Quarto compartilhado', qntHosp: 1, preco: 160, comodidades:['Chaleira', 'Wifi', 'Almoço', 'Jacuzzi'], descricao: "Ambiente Estiloso,com visual deslumbrante,em meio a Natureza, na encosta da Lagoa da Conceição (coração da ilha).Visual da Lagoa e do Mar das praias: “Mole, Galheta e Joaquina”.A 2 km do Centrinho da Lagoa,onde se encontram Cafés,Restaurantes ,Baladas"},
    {local: 'Santa Catarina', title: 'Cabana Praia do Rosa', imgPath: 'https://res.cloudinary.com/dbkdezs4y/image/upload/v1594934921/host/cabanaPraia_nhbitq.webp',espaco: 'Espaco inteiro', qntHosp: 2, preco: 234,comodidades:['Chaleira', 'Wifi', 'Almoço', 'Jacuzzi'], descricao: "Cabana confortável em meio a natureza com vista para o mar e em frente à lagoa do Peri , a 500 mts do mar ( canto sul da praia do rosa) com uma trilha linda até a praia ( 5 minutos caminhando )"},
    {local: 'Santa Catarina', title: 'Ombak Bagus', imgPath: 'https://res.cloudinary.com/dbkdezs4y/image/upload/v1594934929/host/ombakSanta_lsa5xw.webp',espaco: 'Quarto compartilhado', qntHosp: 4, preco: 175,comodidades:['Chaleira', 'Wifi', 'Almoço', 'Jacuzzi'], descricao: "Bangalô Desert Point foi feito para pessoas exigentes, que não abrem mão do conforto e bem estar. Bem localizado, com fácil acesso para a praia da Barra de Ibiraquera(3km) e praias vizinhas, como Praia do Rosa e Garopaba."},
    {local: 'Santa Catarina', title: 'CASA FLUILA', imgPath: 'https://res.cloudinary.com/dbkdezs4y/image/upload/v1594934925/host/casaFluila_a1jkld.webp',espaco: 'Espaco inteiro', qntHosp: 4, preco: 223,comodidades:['Chaleira', 'Wifi', 'Almoço', 'Jacuzzi'], descricao: "Casa Hermosa , esta ubicada en una montana rodeada de mucha natureza , pajaros , olores y cantos de toda nuestra madre natureza .. a 700 mts del centrinho y 900 mts del mar (por un sendero) . Es muy suave y el vivirla hace que escuches tu interior"},
];

(async function seedDB(){
    try{
        const result = await Host.create(host);
        console.log(`Success! Created ${result.length} hosts added to db`);
        mongoose.connection.close();
    }catch(err){
        console.error(err);
    }
})()