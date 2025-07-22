import React from 'react';

const offers = [
  { id: 1, image: 'assets/img/offer-1.jpg', title: 'Special Offer', subtitle: 'Save 20%' },
  { id: 2, image: 'assets/img/offer-2.jpg', title: 'Special Offer', subtitle: 'Save 20%' }
];

const SpecialOffers = () => {
  return (
    <div className="container-fluid pt-5 pb-3">
      <div className="row px-xl-5">
        {offers.map((offer) => (
          <div className="col-md-6" key={offer.id}>
            <div className="product-offer mb-30" style={{ height: '300px' }}>
              <img className="img-fluid" src={offer.image} alt={offer.title} />
              <div className="offer-text">
                <h6 className="text-white text-uppercase">{offer.subtitle}</h6>
                <h3 className="text-white mb-3">{offer.title}</h3>
                <a href="#" className="btn btn-primary">Shop Now</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
