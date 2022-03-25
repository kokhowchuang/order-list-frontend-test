import React from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";

const Back = ({ history }) => (
	<Button
		variant="outlined"
		onClick={history.goBack}
	>
		Back
	</Button>
);

export default withRouter(Back);