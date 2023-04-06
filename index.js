const PORT = 8080
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express()

const urlBut = 'https://www.but.fr/collections/bobochic/index-c10350.html'

const urlHome24 = 'https://www.home24.fr/search?query=bobochic'

const urlGreenweez = 'https://www.greenweez.com/marque/bobochic'

axios(urlBut)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []
        $('.gtm-product', html).each(function() {
            const title = $(this).text()
            const description = $(this).children('div:last').text()
            articles.push({
                title,
                description,
            })
        })         
        console.log(articles)       
    }).catch(err => console.log(err))

    axios(urlHome24)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const products = []
        $('.css-xkjszp', html).each(function() {
            const title = $(this).text()
            const url = `https://www.home24.fr/${$(this).attr('href')}`
            products.push({
                title,
                url,
            })
        })         
        console.log(products)       
    }).catch(err => console.log(err))

    axios(urlGreenweez)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const products = []
        $('.gds-product-card-title__wrapper', html).each(function() {
            const title = $(this).children('.gds-product-card-title__title').text()
            products.push({
                title,
            })
        })         
        console.log(products)       
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))