import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form } from "formik";

import "./styles.css";

const FormWrap = props => {
  return (
    <div>
      FormWrap props:
      <pre>{JSON.stringify(props, null, 2)}</pre>
      <Formik
        enableReinitialize // missing piece!!
        initialValues={props.initialValues}
        render={formProps => {
          return (
            <Form>
              formProps:
              <div>
                <pre>{JSON.stringify(formProps, null, 2)}</pre>
              </div>
            </Form>
          );
        }}
      />
    </div>
  );
};

const SpecificForm = props => {
  return (
    <div>
      SpecificForm props:
      <pre>{JSON.stringify(props, null, 2)}</pre>
      <hr />
      <FormWrap
        initialValues={{
          id: props.id,
          name: props.name
        }}
      />
    </div>
  );
};

const SelectEntity = props => {
  return (
    <select {...props}>
      <option value="1">Entity 1</option>
      <option value="2">Entity 2</option>
      <option value="3">Entity 3</option>
    </select>
  );
};

const entities = {
  1: {
    id: 1,
    name: "Entity 1"
  },
  2: {
    id: 2,
    name: "Entity 2"
  },
  3: {
    id: 3,
    name: "Entity 3"
  }
};

class Page extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedEntity: 2
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ selectedEntity: e.target.value });
  }

  render() {
    const entityData = entities[this.state.selectedEntity];
    return (
      <div>
        <SelectEntity
          onChange={this.handleChange}
          defaultValue={this.state.selectedEntity}
        />

        <SpecificForm {...entityData} />
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Page />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
