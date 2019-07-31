import React, { Component } from "react";
import backend from "Funksjoner/backend";

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
      //console.warn(data);
      const fylke = data.fylke;
      const kommune = data.kommune;
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
    const { lat, lng, aktivTab } = this.props;
    if (!lat) return null;
    const { data } = this.state;
    if (!data) return null;

    console.log(data);

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
            <h2>{data.sted.kategori}</h2>
            <h2>
              {data.kommune},{data.fylke}
            </h2>
            <h3>
              {lat}, {lng}
            </h3>

            {Object.keys(data.environment).map(kode => {
              const miljøvariabel = data.environment[kode];
              //console.log(miljøvariabel);
              const barn = miljøvariabel.barn;

              return (
                <div>
                  <h2>
                    {miljøvariabel.tittel.nb} - {kode}
                  </h2>
                  <br />
                  {miljøvariabel.url}

                  <ul>
                    {barn.map((value, index) => {
                      return (
                        <div
                          key={index}
                          onClick={e => {
                            // kode for å sette aktiv state til infoside
                            this.props.history.push(value.url);
                          }}
                        >
                          {value.kode} - {value.tittel.nb}
                        </div>
                      );
                    })}
                  </ul>
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
