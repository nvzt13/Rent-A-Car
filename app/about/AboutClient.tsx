'use client';

import React from 'react';

const AboutClient = () => {
  return (
    <div className="py-10 text-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Hakkımızda
        </h1>
        <p className="text-lg mb-4 text-center max-w-3xl mx-auto">
          Rent-A-Car'a hoş geldiniz. Konfor, şıklık ve kolaylıkla yolculuğunuz burada başlıyor. 
          On yılı aşkın süredir müşterilerimize kaliteli kiralık araçlar sunuyor ve en iyi sürüş deneyimini yaşatıyoruz. 
          Misyonumuz, araç kiralamayı herkes için kolay, uygun fiyatlı ve erişilebilir hale getirmektir.
        </p>
        <p className="text-lg mb-4 text-center max-w-3xl mx-auto">
          Kompakt araçlardan SUV'lara, lüks araçlardan geniş filoya kadar her türlü ihtiyacınıza hitap eden seçeneklerimizle 
          hizmetinizdeyiz. İster iş seyahati, ister hafta sonu kaçamağı, ister aile tatili olsun — sizin için mükemmel bir aracımız var.
        </p>
        <p className="text-lg mb-4 text-center max-w-3xl mx-auto">
          Rent-A-Car olarak müşteri memnuniyetini her zaman en ön planda tutuyoruz. Güler yüzlü hizmet anlayışımızla, 
          araç kiralama sürecinizin baştan sona sorunsuz geçmesini sağlıyoruz. Alanında uzman ekibimiz, 
          her türlü soru ve sorununuzda size yardımcı olmaktan memnuniyet duyar.
        </p>
        <p className="text-lg text-center max-w-3xl mx-auto mb-10">
          Rent-A-Car'ı tercih ettiğiniz için teşekkür ederiz. Yolculuğunuzu unutulmaz kılmak için sabırsızlanıyoruz.
        </p>

        {/* Harita Bölümü */}
        <div className="max-w-4xl mx-auto mt-10">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Konumumuz
          </h2>
          <div className="w-full h-96 rounded-lg overflow-hidden">
            <iframe
              title="Konumumuz"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.0921%2C51.503%2C-0.0871%2C51.507&layer=mapnik&marker=51.505%2C-0.0896"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutClient;
