import typesystem from "@artsdatabanken/typesystem";
import { withStyles, withTheme } from "@material-ui/core/styles";
import React from "react";

const styles = {
  chip: {
    fontWeight: 600,
    paddingLeft: "2px",
    paddingRight: "4px",
    float: "left"
    //        color: this.props.theme.palette.secondary.main,
  }
};
class Kodetagg extends React.Component {
  render() {
    const kode = this.props.kode.toUpperCase();
    const tekst = this.props.hele ? kode.slice(3) : this.sisteDelAvKoden(kode);
    return (
      <span title={kode} className={styles.chip}>
        {tekst}
      </span>
    );
  }

  sisteDelAvKoden(kode) {
    return typesystem.splittKode(kode).pop();
  }
}

export default withStyles(styles)(withTheme()(Kodetagg));
