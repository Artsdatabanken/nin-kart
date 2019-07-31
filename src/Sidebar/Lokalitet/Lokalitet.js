import React, { Component } from "react";
import backend from "Funksjoner/backend";
import { ArrowRight } from "@material-ui/icons";

class Lokalitet extends Component {
  state = { bareAktive: false };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.lng !== this.props.lng || this.props.lat !== prevProps.lat)
      this.fetch(this.props.lng, this.props.lat, this.props.localId);
  }
  componentDidMount() {
    this.fetch(this.props.lng, this.props.lat);
  }

  fetch(lng, lat) {
    this.setState({
      data: null,
      sted: null
    });
    backend.hentStedsnavn(lng, lat).then(sted => {
      this.setState({ sted: sted });
    });
    backend.hentPunkt(lng, lat).then(data => {
      console.warn(data);
      const fylke = data.fylke || "Oslo"; /// FIKS! BARE FOR TESTING
      const kommune = data.kommune || "Oslo"; /// FIKS! BARE FOR TESTING
      let url =
        "/Fylke/" + fylke + "/" + kommune + "?lng=" + lng + "&lat=" + lat;
      url = url.replace(/ /g, "_");
      this.props.history.push(url);
      this.setState({
        data: data
      });
    });
  }

  render() {
    const { lat, lng, aktivTab, onNavigate } = this.props;
    if (!lat) return null;
    const { data } = this.state;
    if (!data) return null;
    const fylke = data.fylke || "Oslo"; /// FIKS! BARE FOR TESTING
    const kommune = data.kommune || "Oslo"; /// FIKS! BARE FOR TESTING

    return (
      <>
        <div
          className={
            (aktivTab === "informasjon" ? "mobile_on" : "mobile_off") +
            " main_body"
          }
        >
          <div className="main_body_wrapper">
            <h1>{data.sted.navn}</h1>
            <h2>
              {data.sted.kategori[0]}, {data.sted.kategori[1]},{" "}
              {data.sted.kategori[2]}
            </h2>
            <h2>
              {kommune},{fylke}
            </h2>
            <h3>
              {lat}, {lng}
            </h3>

            {Object.keys(data.environment).map(kode => {
              const miljøvariabel = data.environment[kode];
              //console.log(miljøvariabel);
              if (!miljøvariabel) return null;
              const barn = miljøvariabel.barn;

              return (
                <div className="lokasjon_item">
                  <h3>
                    {miljøvariabel.tittel && miljøvariabel.tittel.nb} - {kode}
                  </h3>
                  {miljøvariabel.ingress}
                  <span
                    onClick={() => {
                      onNavigate(miljøvariabel.url);
                    }}
                  >
                    {" "}
                    Les mer... <ArrowRight />
                  </span>
                  <br />

                  <div className="lokasjon_badge_container">
                    {barn &&
                      barn.map((value, index) => {
                        //console.log(value);
                        const imgurl =
                          "https://data.artsdatabanken.no/" + value.bilde;
                        return (
                          <div
                            key={index}
                            onClick={() => {
                              onNavigate(value.url);
                            }}
                          >
                            <div
                              className="badge"
                              key={index}
                              style={{ opacity: value.aktiv ? "1" : "0.2" }}
                            >
                              <div
                                className="badge_image"
                                style={{
                                  backgroundPosition: "center",
                                  backgroundRepeat: "no-repeat",
                                  backgroundSize: "cover",
                                  backgroundImage: "url(" + imgurl + ")"
                                }}
                                onClick={() => {
                                  onNavigate(value.url);
                                }}
                              />
                              <br />
                              <b>{value.tittel.nb}</b>
                              <br />
                              <b>{value.kode}</b>
                              <span>{value.aktiv && "Finnes i området "}</span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="big_page_sidebar" />
      </>
    );
  }
}

export default Lokalitet;
