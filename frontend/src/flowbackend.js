import "./App.css";
import { useEffect, useState } from "react";
import React from "react";
import ReactDOM from "react-dom";
import { Button, ListGroup, Modal } from "react-bootstrap";
import ReactFlow, { Controls, MiniMap, Background } from "react-flow-renderer";
import fetchGraphQL from "./fetchGraphQl";
import graphql from "babel-plugin-relay/macro";
import {
  RelayEnvironmentProvider,
  loadQuery,
  usePreloadedQuery,
} from "react-relay/hooks";
import RelayEnvironment from "./RelayEnvironment";

const { Suspense } = React;
const backelements = [
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
function FlowBackEnd() {
  const BackendQuery = graphql`
    query flowbackendQuery {
        backEnd {
        id
        name
        skills {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    }
  `;
  const [show, setShow] = useState(false);
  const preloadedQuery = loadQuery(RelayEnvironment, BackendQuery, {
    /* query variables */
  });
  const prepElementData = (params) => {
    if (params.length > 0) {
      const xposition = 250;
      var yposition = 25;
      var elemntsList = [];
      params.map((element) => {
        const elementFrontEnd = {
          id: element.node.id,
          type: "input", // input node
          data: { label: element.node.name },
          position: { x: xposition, y: yposition },
        };
        elemntsList.push(elementFrontEnd);
        yposition = 100 + yposition;
      });
      // console.log(elemntsList);
      return elemntsList;
      // setElementFrontEnd(elemntsList);
    }
  };
  function AppBackendRelay(props) {
    const data = usePreloadedQuery(BackendQuery, props.preloadedQuery);
    const _elements = prepElementData(data.backEnd.skills.edges);
    console.log(_elements);
    return (
      <div style={{ height: 800 }}>
        <ReactFlow elements={_elements} snapToGrid={true} snapGrid={[15, 15]}>
          <MiniMap
            nodeStrokeColor={(n) => {
              if (n.style?.background) return n.style.background;
              if (n.type === "input") return "#0041d0";
              if (n.type === "output") return "#ff0072";
              if (n.type === "default") return "#1a192b";

              return "#eee";
            }}
            nodeColor={(n) => {
              if (n.style?.background) return n.style.background;

              return "#fff";
            }}
            nodeBorderRadius={2}
          />
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    );
  }

  return (
    <div className="col-md-12">
      <div className="row" style={{ float: "right" }}>
        <Button variant="primary" onClick={() => setShow(true)}>
          Add Skill
        </Button>
      </div>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <Suspense fallback={"Loading..."}>
          <AppBackendRelay preloadedQuery={preloadedQuery} />
        </Suspense>
      </RelayEnvironmentProvider>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Add Skill to FronEnd Area
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
        <Modal.Footer>
          <p>
            <Button type="button" class="btn btn-primary btn-sm">
              Cancel
            </Button>
            <Button type="button" class="btn btn-primary btn-sm">
              Add
            </Button>
          </p>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FlowBackEnd;
