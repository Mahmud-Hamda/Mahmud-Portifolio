import { useEffect, useRef, useState } from "react";

import Slider from "react-slick";
import "../../sections/Testimonials/Testimonials.module.css";
import styles from "./ProjectDetailsModal.module.css";

const ProjectDetailsModal = ({ projectDetails }) => {
  const sliderRef = useRef();
  const [failed, setFailed] = useState({});

  const images = (
    projectDetails?.sliderImages?.length
      ? projectDetails.sliderImages
      : [projectDetails?.thumbImage]
  ).filter((image) => image && !failed[image]);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var settings = {
    dots: images.length > 1,
    arrows: false,
    infinite: images.length > 1,
    adaptiveHeight: true,
    speed: reduceMotion ? 0 : 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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

  useEffect(() => {
    setFailed({});
    sliderRef.current?.slickGoTo(0);
  }, [projectDetails]);

  return (
    <>
      <div
        className={"modal fade bg-dark-1 " + styles.root}
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div
            className={
              "modal-content "
            }
          >
            <div className="modal-body">
              <button
                type="button"
                className={"btn-close "}
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              <div
                className={
                  "container ajax-container "
                }
              >
                <h2
                  className={
                    "text-6 font-weight-600 text-center mb-4 " + styles.title
                  }
                >
                  {projectDetails?.title || "Sample"}
                </h2>
                <div className="row g-4">
                  <div className="col-md-7">
                    {!projectDetails ? (
                      <p className={styles.note}>
                        Choose a project card to see this sample.
                      </p>
                    ) : images.length === 0 ? (
                      <p className={styles.note}>The sample image did not load.</p>
                    ) : (
                      <Slider {...settings} ref={sliderRef}>
                        {images.map((image, index) => (
                          <div className="item" key={`${image}-${index}`}>
                            <img
                              className="img-fluid"
                              alt={`${projectDetails.title}, layout sample`}
                              src={image}
                              onError={() =>
                                setFailed((current) => ({ ...current, [image]: true }))
                              }
                            />
                          </div>
                        ))}
                      </Slider>
                    )}
                  </div>
                  <div className="col-md-5">
                    <h3 className="text-4 font-weight-600">
                      Project Info:
                    </h3>
                    <p>
                      This card is a layout sample. It is not a completed client project.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsModal;
