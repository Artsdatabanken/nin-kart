import { withStyles } from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

const StyledExpansionPanelSummary = withStyles({
  content: { margin: 0, _padding: 0, height: 40, minHeight: 40 },
  expanded: { height: 40, minHeight: 40 }
})(ExpansionPanelSummary);

export default StyledExpansionPanelSummary;
