'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   let data =  [
     {
       "title" : "Spiderman",
       "caption" : "Spiderman No Way Home",
       "poster_image_url" : "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2021/08/30/2823959124.jpg",
       "UserId" : 3,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      "title" : "Spiderman Far From Home",
      "caption" : "Spiderman no way Home",
      "poster_image_url" : "https://cdn.mos.cms.futurecdn.net/A5x4ziTQJtr4qNrSCx6x5W.jpg",
      "UserId" : 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      "title" : "Spiderman No Way Home",
      "caption" : "Spiderman no way Home ",
      "poster_image_url" : "https://cdn.vox-cdn.com/thumbor/YdOeMYL0O2A7ECAE6VKMzBqYpNQ=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23006417/sad_spideys.jpg",
      "UserId" : 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ]
   await queryInterface.bulkInsert("Photos", data, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Photos', null, {})
  }
};
