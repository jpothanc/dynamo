const About = () => {
  return (
    <>
      <div className="about-box">
        <div className="about-box__content">
          <p className="header-text">Dynamo: The JSON API Visulaizer</p>
          <br></br>
          <br></br>
          <p className="text-orange">
            Dynamo's intuitive interface presents JSON API data in a visually
            structured grid format, making it easy to comprehend ans search
            simple api data.
            <br></br>
            <br></br>
            Easily switch between development (dev), user acceptance testing
            (UAT), and production environments. Effortlessly connect to your
            configured JSON APIs, empowering you to view, and analyze data from
            various sources with unparalleled ease.
            <br></br>
            <br></br>
            Dynamo empowers your team to work more efficiently, collaborate
            effectively, and gain deeper insights into your JSON APIs.Ideal for
            developers, testers, and data analysts. Explore Dynamo for efficient
            JSON API insights
            <br></br>
            <br></br>
            <p className="text-green">
              Developed by &nbsp;
              <a
                className="link"
                href="https://jpothanc.github.io/"
                target="self"
              >
                Jessish Pothancheri
              </a>
            </p>
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
