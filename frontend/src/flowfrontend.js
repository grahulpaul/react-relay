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
  mutation,useMutation
} from "react-relay/hooks";
import {commitMutation } from "react-relay";
import RelayEnvironment from "./RelayEnvironment";

const { Suspense } = React;

function FlowFrontEnd() {
  const FrontendQuery = graphql`
    query flowfrontendQuery {
      frontEnd {
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
  const [inputValue, setInputValue] = useState("");
  const preFrontEndloadedQuery = loadQuery(RelayEnvironment, FrontendQuery, {
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
      console.log(elemntsList);
      return elemntsList;
      // setElementFrontEnd(elemntsList);
    }
  };
  const [mutate, { loading }] = useMutation(
    graphql`
    mutation flowfrontendMutation {
      introduceSkill(
        input: {
          skillName: "tdfest"
          areaId: 1
          clientMutationId: ""
        }
      ) {
        skill{
          id
          name
        }
        area{
          name
          id
          skills{
            pageInfo{
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
          }
        }
      }
    }
    `,
    {
      onCompleted: ({ myMutation }) => {
        window.alert(`received ${myMutation.value}`);
      },
    }
  );

  function AppRelay(props) {
    const data = usePreloadedQuery(FrontendQuery, props.preloadedQuery);
    const _elements = prepElementData(data.frontEnd.skills.edges);
    return (
      <div style={{ height: 500 }}>
        <ReactFlow
          elements={_elements}
          onClick={() => {
            setShow(true);
          }}
          // snapToGrid={true}
          // snapGrid={[15, 15]}
        >
          {/* <MiniMap
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
          /> */}
          {/* <Controls /> */}
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    );
  }

  return (
    <div className="">
      {/* <div className="row" style={{ float: "right" }}>
        <Button variant="primary" onClick={() => setShow(true)}>
          Add Skill
        </Button>
      </div> */}
      {/* <RelayEnvironmentProvider environment={RelayEnvironment}> */}
        <Suspense fallback={"Loading..."}>
          <AppRelay preloadedQuery={preFrontEndloadedQuery} />
        </Suspense>
      {/* </RelayEnvironmentProvider> */}
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
          <label htmlFor="">Skill Name:</label>
          <br />
          <input
            style={{ width: "100%" }}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <p>
            <button class="btn btn-danger btn-block">Cancel</button>
          </p>
          <p>
            <button
              class="btn btn-success btn-block"
              disabled={!inputValue}
              onClick={() => {
                mutate({
                  variables: {
                      "input": {
                        "skillName": "name",
                        "areaId": 1
                      }
                  },
                  onCompleted(data) {
                    console.log(data);
                  },
                });
              }}
            >
              Save
            </button>
          </p>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FlowFrontEnd;
