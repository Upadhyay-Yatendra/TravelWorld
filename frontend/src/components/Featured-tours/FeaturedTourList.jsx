import React, { useState, useEffect } from "react";
import TourCard from "../../shared/TourCard";
import { Col } from "reactstrap";
import useFetch from "./../../hooks/useFetch";
import { BASE_URL } from "./../../utils/config";
import BounceLoader from "react-spinners/BounceLoader";

const FeaturedTourList = () => {
  const [loading, setLoading] = useState(true);
  const { data: featuredTours, error } = useFetch(
    `${BASE_URL}/tours/search/getFeaturedTour`
  );

  useEffect(() => {
    // Only set loading to false when data is fetched
    setLoading(!featuredTours && !error);
  }, [featuredTours, error]);

  return (
    <>
      {loading ? (
        <div className="loading-parent" style={{ position: "relative" }}>
          <InteractiveSpinner />
          <h2>Loading...</h2>
        </div>
      ) : (
        !error &&
        featuredTours?.map((tour) => (
          <Col lg="3" md="4" sm="6" className="mb-4" key={tour._id}>
            <TourCard tour={tour} />
          </Col>
        ))
      )}
    </>
  );
};

const InteractiveSpinner = () => {
  const [spinnerPosition, setSpinnerPosition] = useState({
    top: "50%",
    left: "50%",
  });

  const handleTap = () => {
    // Move the spinner to a random position within the parent div
    const parentDiv = document.querySelector(".loading-parent");
    if (parentDiv) {
      const parentRect = parentDiv.getBoundingClientRect();
      const maxTop = parentRect.height - 50; // 50 is the spinner size
      const maxLeft = parentRect.width - 50; // 50 is the spinner size

      const newTop = Math.random() * maxTop;
      const newLeft = Math.random() * maxLeft;

      setSpinnerPosition({
        top: `${(newTop / parentRect.height) * 100}%`,
        left: `${(newLeft / parentRect.width) * 100}%`,
      });
    }
  };

  return (
    <div
      onClick={handleTap}
      style={{
        position: "absolute",
        top: spinnerPosition.top,
        left: spinnerPosition.left,
        cursor: "pointer",
      }}
    >
      <BounceLoader color="#FAA936" size={80} />
      <p>Try to touch me while the tours load!</p>
    </div>
  );
};

export default FeaturedTourList;
