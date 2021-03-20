import "./App.css";
import { useEffect, useState } from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";
import ReactFlow, { Controls, MiniMap, Background } from "react-flow-renderer";
import FlowFrontEnd from './flowfrontend';
import FlowBackEnd from './flowbackend';
import {
  RelayEnvironmentProvider,
  loadQuery,
  usePreloadedQuery,
} from "react-relay/hooks";
import RelayEnvironment from "./RelayEnvironment";
function ViewFlow() {
  const elements = [
    {
      id: "1",
      type: "input", // input node
      data: { label: "Input Node" },
      position: { x: 250, y: 25 },
    },
    // default node
    {
      id: "2",
      // you can also pass a React component as a label
      type: "input", // input node
      data: { label: <div>Default Node</div> },
      position: { x: 250, y: 125 },
    },
    {
      id: "3",
      type: "output", // output node
      data: { label: "Output Node" },
      position: { x: 250, y: 250 },
    },
    // animated edge
    // { id: 'e1-2', source: '1', target: '2', animated: true },
    // { id: 'e2-3', source: '2', target: '3' },
  ];
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-6" style={{ height: 500 }}>
          <RelayEnvironmentProvider environment={RelayEnvironment}>
            <FlowFrontEnd></FlowFrontEnd>
            </RelayEnvironmentProvider>
          </div>
          <div className="col-md-6" style={{ height: 500 }}>
          <FlowBackEnd ></FlowBackEnd>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
            commodi aspernatur enim, consectetur. Cumque deleniti temporibus
            ipsam atque a dolores quisquam quisquam adipisci possimus
            laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
            accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
            reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
            deleniti rem!
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ViewFlow;
