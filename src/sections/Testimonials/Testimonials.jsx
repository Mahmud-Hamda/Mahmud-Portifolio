import Slider from "react-slick";
import client1 from "../../assets/images/testimonial/client-sm-1.jpg";
import client2 from "../../assets/images/testimonial/client-sm-2.jpg";
import client3 from "../../assets/images/testimonial/client-sm-3.jpg";
import client4 from "../../assets/images/testimonial/client-sm-4.jpg";
import styles from "./Testimonials.module.css";

const reviews = [
  { name: "Dennis Jacques", position: "User from USA", src: client3, desc: "Only trying it out since a few days. But up to now excellent. Seems to work flawlessly. priced simply dummy text of the printing and typesetting industry.", rating: 5 },
  { name: "Jay Shah", position: "Founder at Icomatic Pvt Ltd", src: client1, desc: "Easy to use, reasonably priced simply dummy text of the printing and typesetting industry. Quidam lisque persius interesset his et, in quot quidam possim iriure.", rating: 5 },
  { name: "Patrick Cary", position: "Freelancer from USA", src: client2, desc: "I am happy Working with printing and typesetting industry. Quidam lisque persius interesset his et, in quot quidam persequeris essent possim iriure.", rating: 5 },
  { name: "Chris Tom", position: "User from UK", src: client4, desc: "I have used them twice now. Good rates, very efficient service and priced simply dummy text of the printing and typesetting industry quidam interesset his et. Excellent.", rating: 5 },
];

const Testimonials = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };
  return (
    <section
      id="testimonial"
      className={styles.root + " section "}
    >
      <div className="container px-lg-5">
        {/* Heading */}
        <div className={"position-relative d-flex text-center mb-5" + " section-title-band"}>
          <h2
            className={
              "text-24  text-uppercase fw-600 w-100 mb-0 " +
              "text-light opacity-4"
            }
            aria-hidden="true"
          >
            Testimonial
          </h2>
          <p
            role="heading"
            aria-level={2}
            className={
              "text-9 text-dark fw-600 position-absolute w-100 align-self-center lh-base mb-0 " +
              "text-dark"
            }
          >
            {" "}
            Client Speak
            <span className="heading-separator-line border-bottom border-3 border-primary d-block mx-auto" />
          </p>
        </div>
        <p className="text-center mb-4">
          Sample quotes for the layout. Not client feedback.
        </p>

        <Slider {...settings}>
          {reviews.length > 0 &&
            reviews.map((value, index) => (
              <div className="item" key={index}>
                <div
                  className={
                    "soft-card rounded p-5 "
                  }
                >
                  <div className="d-flex align-items-center mt-auto mb-4">
                    <img
                      className="img-fluid rounded-circle border d-inline-block w-auto"
                      src={value.src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    <p className="ms-3 mb-0">
                      <strong
                        className={
                          "d-block fw-600 " +
                          "text-dark"
                        }
                      >
                        {value.name}
                      </strong>
                      <span className="text-muted fw-500">
                        {" "}
                        {value.position}{" "}
                      </span>
                    </p>
                  </div>
                  <p
                    className={
                      " fw-500 mb-4 " + "text-dark"
                    }
                  >
                    “{value.desc}”
                  </p>
                  <span className="text-2">
                    {[...Array(value.rating)].map((value, i) => (
                      <i className="fas fa-star text-warning" key={i} />
                    ))}
                  </span>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
