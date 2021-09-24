import { InstanceGraphApi_traverseGraphV2 } from "@next-sdk/cmdb-sdk";
import {
  BuildInfoForProjectOfTemplates,
  BuildProjectOfTemplates,
  BuildProjectOfTemplatesParams,
  safeJSONParse,
} from "./BuildProjectOfTemplates";

jest.mock("@next-sdk/cmdb-sdk");
const consoleError = jest
  .spyOn(console, "error")
  .mockImplementation(() => void 0);

// And given a graph of templates:
//      t        u
//      ↓        ↓
//     t-1      u-1
//      ↓
//    ↙   ↘
// t-1-1 t-1-2
//
// Given a graph of snippets:
//      x        y
//      ↓        ↓
//     x-1      y-1
//      ↓
//    ↙   ↘
// x-1-1 x-1-2
(InstanceGraphApi_traverseGraphV2 as jest.Mock).mockImplementation(
  (graphParams) =>
    graphParams.object_id === "STORYBOARD_TEMPLATE"
      ? {
          topic_vertices: [
            {
              appId: "test",
              id: "T-01",
              instanceId: "t",
              templateId: "template-t",
              creator: "abc",
              proxy: null,
            },
            {
              appId: "test",
              id: "T-02",
              instanceId: "u",
              templateId: "template-u",
              creator: "abc",
              proxy: `{
                "properties": {
                  "a": {
                    "ref":"b",
                    "refProperty":"c",
                    "description": "properties介绍",
                    "type": "string",
                    "default": "hello",
                    "required": "false"
                  },
                  "b": {
                    "ref": "b-ref",
                    "refProperty": "b-property"
                  }
                },
                "events": {
                  "a.click": {
                    "ref": "d",
                    "refEvent": "general.a.click",
                    "detail": "{data:Record<string,any>[]}",
                    "description": "events介绍"
                  }
                },
                "methods": {
                  "sayHello": {
                    "ref": "e",
                    "refMethod": "a.say",
                    "params": "{ id: string | number, name: string }",
                    "description": "methods介绍"
                  }
                },
                "slots": {
                  "toolbar": {
                    "ref": "f",
                    "refSlot": "f-toobar",
                    "description": "slots介绍"
                  }
                }
              }`,
            },
            {
              appId: "test",
              id: "T-03",
              instanceId: "v",
              templateId: "template-v",
              creator: "abc",
              proxy: `{
                "properties": null,
                "events": {},
                "methods": 1
              }`,
            },
          ],
          vertices: [
            {
              instanceId: "t-1",
              type: "brick",
              brick: "easy-view",
              properties: `{"gap":"<% PROCESSORS.myPkg.myFunc() %>"}`,
            },
            {
              instanceId: "t-1-1",
              type: "brick",
              brick: "general-button",
              mountPoint: "a",
              events: '{"click":{"action":"console.log"}}',
            },
            {
              instanceId: "t-1-2",
              type: "provider",
              brick: "test-provider",
              mountPoint: "b",
              bg: true,
            },
            {
              instanceId: "u-1",
              type: "brick",
              brick: "template-t",
              properties: '{"gridTemplateAreas":[["left","right"]]}',
            },
          ],
          edges: [
            {
              in: "t-1",
              out: "t",
              out_name: "children",
            },
            {
              in: "t-1-1",
              out: "t-1",
              out_name: "children",
            },
            {
              in: "t-1-2",
              out: "t-1",
              out_name: "children",
            },
            {
              in: "u-1",
              out: "u",
              out_name: "children",
            },
          ],
        }
      : graphParams.query["project.instanceId"] === "project-1"
      ? {
          topic_vertices: [
            {
              id: "S-01",
              instanceId: "x",
              snippetId: "hosted-snippet-x",
              text: {
                zh: "片段 X",
                en: "Snippet X",
              },
              category: "hosted",
              thumbnail: "url-x",
            },
            {
              id: "S-02",
              instanceId: "y",
              snippetId: "hosted-snippet-y",
              category: "hosted",
              thumbnail: "url-y",
            },
          ],
          vertices: [
            {
              instanceId: "x-1",
              type: "brick",
              brick: "easy-view",
              properties: `{"gap":10}`,
            },
            {
              instanceId: "x-1-1",
              type: "brick",
              brick: "general-button",
              mountPoint: "a",
              events: '{"click":{"action":"console.log"}}',
            },
            {
              instanceId: "x-1-2",
              type: "provider",
              brick: "test-provider",
              mountPoint: "b",
              bg: true,
            },
            {
              instanceId: "y-1",
              type: "brick",
              brick: "easy-view",
              properties: '{"gridTemplateAreas":[["left","right"]]}',
            },
          ],
          edges: [
            {
              in: "x-1",
              out: "x",
              out_name: "children",
            },
            {
              in: "x-1-1",
              out: "x-1",
              out_name: "children",
            },
            {
              in: "x-1-2",
              out: "x-1",
              out_name: "children",
            },
            {
              in: "y-1",
              out: "y",
              out_name: "children",
            },
          ],
        }
      : {}
);

describe("BuildProjectOfTemplates", () => {
  it.each<[BuildProjectOfTemplatesParams, BuildInfoForProjectOfTemplates]>([
    [
      {
        appId: "app-1",
        projectId: "project-1",
      },
      {
        files: [
          {
            path: "dist/bricks.json",
            content: `{
  "bricks": [
    "app-1.template-t",
    "app-1.template-u",
    "app-1.template-v"
  ]
}`,
          },
          {
            path: "dist/index.dbea6502.js",
            content: expect.stringContaining(`
Object(n.getRuntime)().registerCustomTemplate("app-1.template-t", {
  "bricks": [
    {
      "brick": "easy-view",
      "properties": {
        "gap": "<% PROCESSORS.myPkg.myFunc() %>"
      },
      "slots": {
        "a": {
          "type": "bricks",
          "bricks": [
            {
              "brick": "general-button",
              "events": {
                "click": {
                  "action": "console.log"
                }
              }
            }
          ]
        },
        "b": {
          "type": "bricks",
          "bricks": [
            {
              "brick": "test-provider",
              "bg": true
            }
          ]
        }
      }
    }
  ]
}),
Object(n.getRuntime)().registerCustomTemplate("app-1.template-u", {
  "proxy": {
    "properties": {
      "a": {
        "ref": "b",
        "refProperty": "c",
        "description": "properties介绍",
        "type": "string",
        "default": "hello",
        "required": "false"
      },
      "b": {
        "ref": "b-ref",
        "refProperty": "b-property"
      }
    },
    "events": {
      "a.click": {
        "ref": "d",
        "refEvent": "general.a.click",
        "detail": "{data:Record<string,any>[]}",
        "description": "events介绍"
      }
    },
    "methods": {
      "sayHello": {
        "ref": "e",
        "refMethod": "a.say",
        "params": "{ id: string | number, name: string }",
        "description": "methods介绍"
      }
    },
    "slots": {
      "toolbar": {
        "ref": "f",
        "refSlot": "f-toobar",
        "description": "slots介绍"
      }
    }
  },
  "bricks": [
    {
      "brick": "app-1.template-t",
      "properties": {
        "gridTemplateAreas": [
          [
            "left",
            "right"
          ]
        ]
      }
    }
  ]
}),
Object(n.getRuntime)().registerCustomTemplate("app-1.template-v", {
  "proxy": {
    "properties": null,
    "events": {},
    "methods": 1
  },
  "bricks": []
})
`),
          },
          {
            path: "dist/stories.json",
            content: `[
  {
    "storyId": "test.template-t",
    "type": "brick",
    "layerType": "widget",
    "author": "abc",
    "doc": {
      "id": "test.template-t",
      "name": "test.template-t",
      "dockind": "brick",
      "author": "abc",
      "slots": null,
      "history": null
    }
  },
  {
    "storyId": "test.template-u",
    "type": "brick",
    "layerType": "widget",
    "author": "abc",
    "doc": {
      "id": "test.template-u",
      "name": "test.template-u",
      "dockind": "brick",
      "author": "abc",
      "slots": [
        {
          "name": "toolbar",
          "description": "slots介绍"
        }
      ],
      "history": null,
      "properties": [
        {
          "name": "a",
          "type": "string",
          "required": "false",
          "default": "hello",
          "description": "properties介绍"
        },
        {
          "name": "b",
          "type": "-",
          "required": "-",
          "default": "-",
          "description": "-"
        }
      ],
      "events": [
        {
          "type": "a.click",
          "detail": "{data:Record<string,any>[]}",
          "description": "events介绍"
        }
      ],
      "methods": [
        {
          "name": "sayHello",
          "params": "{ id: string | number, name: string }",
          "description": "methods介绍"
        }
      ]
    }
  },
  {
    "storyId": "test.template-v",
    "type": "brick",
    "layerType": "widget",
    "author": "abc",
    "doc": {
      "id": "test.template-v",
      "name": "test.template-v",
      "dockind": "brick",
      "author": "abc",
      "history": null
    }
  }
]`,
          },
          {
            path: "dist/snippets.json",
            content: `{
  "snippets": [
    {
      "id": "app-1.hosted-snippet-x",
      "category": "hosted",
      "text": {
        "zh": "片段 X",
        "en": "Snippet X"
      },
      "thumbnail": "url-x",
      "bricks": [
        {
          "brick": "easy-view",
          "properties": {
            "gap": 10
          },
          "slots": {
            "a": {
              "type": "bricks",
              "bricks": [
                {
                  "brick": "general-button",
                  "events": {
                    "click": {
                      "action": "console.log"
                    }
                  }
                }
              ]
            },
            "b": {
              "type": "bricks",
              "bricks": [
                {
                  "brick": "test-provider",
                  "bg": true
                }
              ]
            }
          }
        }
      ]
    },
    {
      "id": "app-1.hosted-snippet-y",
      "category": "hosted",
      "thumbnail": "url-y",
      "bricks": [
        {
          "brick": "easy-view",
          "properties": {
            "gridTemplateAreas": [
              [
                "left",
                "right"
              ]
            ]
          }
        }
      ]
    }
  ]
}`,
          },
        ],
        dependBricks: ["easy-view", "general-button", "test-provider"],
        dependProcessorPackages: ["my-pkg"],
      },
    ],
    [
      {
        appId: "app-2",
        projectId: "project-2",
      },
      {
        files: [
          {
            path: "dist/bricks.json",
            content: `{
  "bricks": [
    "app-2.template-t",
    "app-2.template-u",
    "app-2.template-v"
  ]
}`,
          },
          {
            path: "dist/index.1e1641d4.js",
            content: expect.stringContaining(
              'registerCustomTemplate("app-2.template-t",'
            ),
          },
          {
            path: "dist/stories.json",
            content: `[
  {
    "storyId": "test.template-t",
    "type": "brick",
    "layerType": "widget",
    "author": "abc",
    "doc": {
      "id": "test.template-t",
      "name": "test.template-t",
      "dockind": "brick",
      "author": "abc",
      "slots": null,
      "history": null
    }
  },
  {
    "storyId": "test.template-u",
    "type": "brick",
    "layerType": "widget",
    "author": "abc",
    "doc": {
      "id": "test.template-u",
      "name": "test.template-u",
      "dockind": "brick",
      "author": "abc",
      "slots": [
        {
          "name": "toolbar",
          "description": "slots介绍"
        }
      ],
      "history": null,
      "properties": [
        {
          "name": "a",
          "type": "string",
          "required": "false",
          "default": "hello",
          "description": "properties介绍"
        },
        {
          "name": "b",
          "type": "-",
          "required": "-",
          "default": "-",
          "description": "-"
        }
      ],
      "events": [
        {
          "type": "a.click",
          "detail": "{data:Record<string,any>[]}",
          "description": "events介绍"
        }
      ],
      "methods": [
        {
          "name": "sayHello",
          "params": "{ id: string | number, name: string }",
          "description": "methods介绍"
        }
      ]
    }
  },
  {
    "storyId": "test.template-v",
    "type": "brick",
    "layerType": "widget",
    "author": "abc",
    "doc": {
      "id": "test.template-v",
      "name": "test.template-v",
      "dockind": "brick",
      "author": "abc",
      "history": null
    }
  }
]`,
          },
        ],
        dependBricks: ["easy-view", "general-button", "test-provider"],
        dependProcessorPackages: ["my-pkg"],
      },
    ],
  ])("BuildProjectOfTemplates(%j) should work", async (params, result) => {
    const buildResult = await BuildProjectOfTemplates(params);
    expect(buildResult).toEqual(result);
  });

  it("safe JSON parse, test", () => {
    const rightJSON = `{
      "name": "abc",
      "age": 18
    }`;
    const errorJSON = `{
      "name": "abc",
      "age": 18,
    }`;
    expect(safeJSONParse(rightJSON)).toEqual({
      name: "abc",
      age: 18,
    });
    safeJSONParse(errorJSON);
    expect(consoleError).toBeCalledTimes(1);
  });
});
