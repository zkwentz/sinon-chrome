[
  {
    "types": [
      {
        "id": "Alarm",
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "scheduledTime": {
            "type": "number"
          },
          "periodInMinutes": {
            "type": "number",
            "nullable": true
          }
        }
      },
      {
        "id": "AlarmCreateInfo",
        "type": "object",
        "properties": {
          "when": {
            "type": "number",
            "nullable": true
          },
          "delayInMinutes": {
            "type": "number",
            "nullable": true
          },
          "periodInMinutes": {
            "type": "number",
            "nullable": true
          }
        }
      }
    ],
    "functions": [
      {
        "name": "create",
        "type": "function",
        "parameters": [
          {
            "type": "string",
            "optional": true,
            "name": "name"
          },
          {
            "$ref": "AlarmCreateInfo",
            "optional": false,
            "name": "alarmInfo"
          }
        ],
        "static": true
      },
      {
        "name": "get",
        "type": "function",
        "parameters": [
          {
            "type": "string",
            "optional": true,
            "name": "name"
          },
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "$ref": "Alarm",
                "optional": true,
                "name": "alarm"
              }
            ]
          }
        ],
        "static": true
      },
      {
        "name": "getAll",
        "type": "function",
        "parameters": [
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "type": "array",
                "items": {
                  "$ref": "Alarm"
                },
                "optional": false,
                "name": "alarms"
              }
            ]
          }
        ],
        "static": true
      },
      {
        "name": "clear",
        "type": "function",
        "parameters": [
          {
            "type": "string",
            "optional": true,
            "name": "name"
          },
          {
            "optional": true,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "type": "boolean",
                "optional": false,
                "name": "wasCleared"
              }
            ]
          }
        ],
        "static": true
      },
      {
        "name": "clearAll",
        "type": "function",
        "parameters": [
          {
            "optional": true,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "type": "boolean",
                "optional": false,
                "name": "wasCleared"
              }
            ]
          }
        ],
        "static": true
      }
    ],
    "events": [
      {
        "name": "onAlarm",
        "type": "function",
        "parameters": [
          {
            "$ref": "Alarm",
            "optional": false,
            "name": "alarm"
          }
        ]
      }
    ],
    "namespace": "alarms",
    "dependencies": [
      "permission:alarms"
    ]
  },
  {
    "namespace": "bookmarks",
    "description": "Use the <code>chrome.bookmarks</code> API to create, organize, and otherwise manipulate bookmarks. Also see <a href='override'>Override Pages</a>, which you can use to create a custom Bookmark Manager page.",
    "properties": {
      "MAX_WRITE_OPERATIONS_PER_HOUR": {
        "value": 1000000,
        "deprecated": "Bookmark write operations are no longer limited by Chrome.",
        "description": ""
      },
      "MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE": {
        "value": 1000000,
        "deprecated": "Bookmark write operations are no longer limited by Chrome.",
        "description": ""
      }
    },
    "types": [
      {
        "id": "BookmarkTreeNodeUnmodifiable",
        "type": "string",
        "enum": [
          "managed"
        ],
        "description": "Indicates the reason why this node is unmodifiable. The <var>managed</var> value indicates that this node was configured by the system administrator or by the custodian of a supervised user. Omitted if the node can be modified by the user and the extension (default)."
      },
      {
        "id": "BookmarkTreeNode",
        "type": "object",
        "description": "A node (either a bookmark or a folder) in the bookmark tree.  Child nodes are ordered within their parent folder.",
        "properties": {
          "id": {
            "type": "string",
            "minimum": 0,
            "description": "The unique identifier for the node. IDs are unique within the current profile, and they remain valid even after the browser is restarted."
          },
          "parentId": {
            "type": "string",
            "minimum": 0,
            "optional": true,
            "description": "The <code>id</code> of the parent folder.  Omitted for the root node."
          },
          "index": {
            "type": "integer",
            "optional": true,
            "description": "The 0-based position of this node within its parent folder."
          },
          "url": {
            "type": "string",
            "optional": true,
            "description": "The URL navigated to when a user clicks the bookmark. Omitted for folders."
          },
          "title": {
            "type": "string",
            "description": "The text displayed for the node."
          },
          "dateAdded": {
            "type": "number",
            "optional": true,
            "description": "When this node was created, in milliseconds since the epoch (<code>new Date(dateAdded)</code>)."
          },
          "dateGroupModified": {
            "type": "number",
            "optional": true,
            "description": "When the contents of this folder last changed, in milliseconds since the epoch."
          },
          "unmodifiable": {
            "$ref": "BookmarkTreeNodeUnmodifiable",
            "optional": true,
            "description": "Indicates the reason why this node is unmodifiable. The <var>managed</var> value indicates that this node was configured by the system administrator or by the custodian of a supervised user. Omitted if the node can be modified by the user and the extension (default)."
          },
          "children": {
            "type": "array",
            "optional": true,
            "items": {
              "$ref": "BookmarkTreeNode"
            },
            "description": "An ordered list of children of this node."
          }
        }
      },
      {
        "id": "CreateDetails",
        "description": "Object passed to the create() function.",
        "inline_doc": true,
        "type": "object",
        "properties": {
          "parentId": {
            "type": "string",
            "serialized_type": "int64",
            "optional": true,
            "description": "Defaults to the Other Bookmarks folder."
          },
          "index": {
            "type": "integer",
            "minimum": 0,
            "optional": true
          },
          "title": {
            "type": "string",
            "optional": true
          },
          "url": {
            "type": "string",
            "optional": true
          }
        }
      }
    ],
    "functions": [
      {
        "name": "get",
        "type": "function",
        "description": "Retrieves the specified BookmarkTreeNode(s).",
        "parameters": [
          {
            "name": "idOrIdList",
            "description": "A single string-valued id, or an array of string-valued ids",
            "choices": [
              {
                "type": "string",
                "serialized_type": "int64"
              },
              {
                "type": "array",
                "items": {
                  "type": "string",
                  "serialized_type": "int64"
                },
                "minItems": 1
              }
            ]
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "results",
                "type": "array",
                "items": {
                  "$ref": "BookmarkTreeNode"
                }
              }
            ]
          }
        ]
      },
      {
        "name": "getChildren",
        "type": "function",
        "description": "Retrieves the children of the specified BookmarkTreeNode id.",
        "parameters": [
          {
            "type": "string",
            "serialized_type": "int64",
            "name": "id"
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "results",
                "type": "array",
                "items": {
                  "$ref": "BookmarkTreeNode"
                }
              }
            ]
          }
        ]
      },
      {
        "name": "getRecent",
        "type": "function",
        "description": "Retrieves the recently added bookmarks.",
        "parameters": [
          {
            "type": "integer",
            "minimum": 1,
            "name": "numberOfItems",
            "description": "The maximum number of items to return."
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "results",
                "type": "array",
                "items": {
                  "$ref": "BookmarkTreeNode"
                }
              }
            ]
          }
        ]
      },
      {
        "name": "getTree",
        "type": "function",
        "description": "Retrieves the entire Bookmarks hierarchy.",
        "parameters": [
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "results",
                "type": "array",
                "items": {
                  "$ref": "BookmarkTreeNode"
                }
              }
            ]
          }
        ]
      },
      {
        "name": "getSubTree",
        "type": "function",
        "description": "Retrieves part of the Bookmarks hierarchy, starting at the specified node.",
        "parameters": [
          {
            "type": "string",
            "serialized_type": "int64",
            "name": "id",
            "description": "The ID of the root of the subtree to retrieve."
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "results",
                "type": "array",
                "items": {
                  "$ref": "BookmarkTreeNode"
                }
              }
            ]
          }
        ]
      },
      {
        "name": "search",
        "type": "function",
        "description": "Searches for BookmarkTreeNodes matching the given query. Queries specified with an object produce BookmarkTreeNodes matching all specified properties.",
        "parameters": [
          {
            "name": "query",
            "description": "Either a string of words and quoted phrases that are matched against bookmark URLs and titles, or an object. If an object, the properties <code>query</code>, <code>url</code>, and <code>title</code> may be specified and bookmarks matching all specified properties will be produced.",
            "choices": [
              {
                "type": "string",
                "description": "A string of words and quoted phrases that are matched against bookmark URLs and titles."
              },
              {
                "type": "object",
                "description": "An object specifying properties and values to match when searching. Produces bookmarks matching all properties.",
                "properties": {
                  "query": {
                    "type": "string",
                    "optional": true,
                    "description": "A string of words and quoted phrases that are matched against bookmark URLs and titles."
                  },
                  "url": {
                    "type": "string",
                    "optional": true,
                    "description": "The URL of the bookmark; matches verbatim. Note that folders have no URL."
                  },
                  "title": {
                    "type": "string",
                    "optional": true,
                    "description": "The title of the bookmark; matches verbatim."
                  }
                }
              }
            ]
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "results",
                "type": "array",
                "items": {
                  "$ref": "BookmarkTreeNode"
                }
              }
            ]
          }
        ]
      },
      {
        "name": "create",
        "type": "function",
        "description": "Creates a bookmark or folder under the specified parentId.  If url is NULL or missing, it will be a folder.",
        "parameters": [
          {
            "$ref": "CreateDetails",
            "name": "bookmark"
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": [
              {
                "name": "result",
                "$ref": "BookmarkTreeNode"
              }
            ]
          }
        ]
      },
      {
        "name": "move",
        "type": "function",
        "description": "Moves the specified BookmarkTreeNode to the provided location.",
        "parameters": [
          {
            "type": "string",
            "serialized_type": "int64",
            "name": "id"
          },
          {
            "type": "object",
            "name": "destination",
            "properties": {
              "parentId": {
                "type": "string",
                "optional": true
              },
              "index": {
                "type": "integer",
                "minimum": 0,
                "optional": true
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": [
              {
                "name": "result",
                "$ref": "BookmarkTreeNode"
              }
            ]
          }
        ]
      },
      {
        "name": "update",
        "type": "function",
        "description": "Updates the properties of a bookmark or folder. Specify only the properties that you want to change; unspecified properties will be left unchanged.  <b>Note:</b> Currently, only 'title' and 'url' are supported.",
        "parameters": [
          {
            "type": "string",
            "serialized_type": "int64",
            "name": "id"
          },
          {
            "type": "object",
            "name": "changes",
            "properties": {
              "title": {
                "type": "string",
                "optional": true
              },
              "url": {
                "type": "string",
                "optional": true
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": [
              {
                "name": "result",
                "$ref": "BookmarkTreeNode"
              }
            ]
          }
        ]
      },
      {
        "name": "remove",
        "type": "function",
        "description": "Removes a bookmark or an empty bookmark folder.",
        "parameters": [
          {
            "type": "string",
            "serialized_type": "int64",
            "name": "id"
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "removeTree",
        "type": "function",
        "description": "Recursively removes a bookmark folder.",
        "parameters": [
          {
            "type": "string",
            "serialized_type": "int64",
            "name": "id"
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "import",
        "type": "function",
        "description": "Imports bookmarks from a chrome html bookmark file",
        "nodoc": "true",
        "parameters": [
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "export",
        "type": "function",
        "description": "Exports bookmarks to a chrome html bookmark file",
        "nodoc": "true",
        "parameters": [
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": []
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onCreated",
        "type": "function",
        "description": "Fired when a bookmark or folder is created.",
        "parameters": [
          {
            "type": "string",
            "name": "id"
          },
          {
            "$ref": "BookmarkTreeNode",
            "name": "bookmark"
          }
        ]
      },
      {
        "name": "onRemoved",
        "type": "function",
        "description": "Fired when a bookmark or folder is removed.  When a folder is removed recursively, a single notification is fired for the folder, and none for its contents.",
        "parameters": [
          {
            "type": "string",
            "name": "id"
          },
          {
            "type": "object",
            "name": "removeInfo",
            "properties": {
              "parentId": {
                "type": "string"
              },
              "index": {
                "type": "integer"
              },
              "node": {
                "$ref": "BookmarkTreeNode"
              }
            }
          }
        ]
      },
      {
        "name": "onChanged",
        "type": "function",
        "description": "Fired when a bookmark or folder changes.  <b>Note:</b> Currently, only title and url changes trigger this.",
        "parameters": [
          {
            "type": "string",
            "name": "id"
          },
          {
            "type": "object",
            "name": "changeInfo",
            "properties": {
              "title": {
                "type": "string"
              },
              "url": {
                "type": "string",
                "optional": true
              }
            }
          }
        ]
      },
      {
        "name": "onMoved",
        "type": "function",
        "description": "Fired when a bookmark or folder is moved to a different parent folder.",
        "parameters": [
          {
            "type": "string",
            "name": "id"
          },
          {
            "type": "object",
            "name": "moveInfo",
            "properties": {
              "parentId": {
                "type": "string"
              },
              "index": {
                "type": "integer"
              },
              "oldParentId": {
                "type": "string"
              },
              "oldIndex": {
                "type": "integer"
              }
            }
          }
        ]
      },
      {
        "name": "onChildrenReordered",
        "type": "function",
        "description": "Fired when the children of a folder have changed their order due to the order being sorted in the UI.  This is not called as a result of a move().",
        "parameters": [
          {
            "type": "string",
            "name": "id"
          },
          {
            "type": "object",
            "name": "reorderInfo",
            "properties": {
              "childIds": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            }
          }
        ]
      },
      {
        "name": "onImportBegan",
        "type": "function",
        "description": "Fired when a bookmark import session is begun.  Expensive observers should ignore onCreated updates until onImportEnded is fired.  Observers should still handle other notifications immediately.",
        "parameters": []
      },
      {
        "name": "onImportEnded",
        "type": "function",
        "description": "Fired when a bookmark import session is ended.",
        "parameters": []
      }
    ],
    "dependencies": [
      "permission:bookmarks"
    ]
  },
  {
    "namespace": "browserAction",
    "description": "Use browser actions to put icons in the main Google Chrome toolbar, to the right of the address bar. In addition to its <a href='browserAction#icon'>icon</a>, a browser action can also have a <a href='browserAction#tooltip'>tooltip</a>, a <a href='browserAction#badge'>badge</a>, and a <a href='browserAction#popups'>popup</a>.",
    "types": [
      {
        "id": "ColorArray",
        "type": "array",
        "items": {
          "type": "integer",
          "minimum": 0,
          "maximum": 255
        },
        "minItems": 4,
        "maxItems": 4
      },
      {
        "id": "ImageDataType",
        "type": "object",
        "isInstanceOf": "ImageData",
        "additionalProperties": {
          "type": "any"
        },
        "description": "Pixel data for an image. Must be an ImageData object (for example, from a <code>canvas</code> element)."
      }
    ],
    "functions": [
      {
        "name": "setTitle",
        "type": "function",
        "description": "Sets the title of the browser action. This shows up in the tooltip.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "properties": {
              "title": {
                "type": "string",
                "description": "The string the browser action should display when moused over."
              },
              "tabId": {
                "type": "integer",
                "optional": true,
                "description": "Limits the change to when a particular tab is selected. Automatically resets when the tab is closed."
              }
            }
          }
        ]
      },
      {
        "name": "getTitle",
        "type": "function",
        "description": "Gets the title of the browser action.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "properties": {
              "tabId": {
                "type": "integer",
                "optional": true,
                "description": "Specify the tab to get the title from. If no tab is specified, the non-tab-specific title is returned."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "result",
                "type": "string"
              }
            ]
          }
        ]
      },
      {
        "name": "setIcon",
        "type": "function",
        "description": "Sets the icon for the browser action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element, or as dictionary of either one of those. Either the <b>path</b> or the <b>imageData</b> property must be specified.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "properties": {
              "imageData": {
                "choices": [
                  {
                    "$ref": "ImageDataType"
                  },
                  {
                    "type": "object",
                    "additionalProperties": {
                      "type": "any"
                    }
                  }
                ],
                "optional": true,
                "description": "Either an ImageData object or a dictionary {size -> ImageData} representing icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals <code>scale</code>, then image with size <code>scale</code> * n will be selected, where n is the size of the icon in the UI. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'16': foo}'"
              },
              "path": {
                "choices": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "object",
                    "additionalProperties": {
                      "type": "any"
                    }
                  }
                ],
                "optional": true,
                "description": "Either a relative image path or a dictionary {size -> relative image path} pointing to icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals <code>scale</code>, then image with size <code>scale</code> * n will be selected, where n is the size of the icon in the UI. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.path = {'16': foo}'"
              },
              "tabId": {
                "type": "integer",
                "optional": true,
                "description": "Limits the change to when a particular tab is selected. Automatically resets when the tab is closed."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "setPopup",
        "type": "function",
        "description": "Sets the html document to be opened as a popup when the user clicks on the browser action's icon.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "properties": {
              "tabId": {
                "type": "integer",
                "optional": true,
                "minimum": 0,
                "description": "Limits the change to when a particular tab is selected. Automatically resets when the tab is closed."
              },
              "popup": {
                "type": "string",
                "description": "The html file to show in a popup.  If set to the empty string (''), no popup is shown."
              }
            }
          }
        ]
      },
      {
        "name": "getPopup",
        "type": "function",
        "description": "Gets the html document set as the popup for this browser action.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "properties": {
              "tabId": {
                "type": "integer",
                "optional": true,
                "description": "Specify the tab to get the popup from. If no tab is specified, the non-tab-specific popup is returned."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "result",
                "type": "string"
              }
            ]
          }
        ]
      },
      {
        "name": "setBadgeText",
        "type": "function",
        "description": "Sets the badge text for the browser action. The badge is displayed on top of the icon.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "properties": {
              "text": {
                "type": "string",
                "description": "Any number of characters can be passed, but only about four can fit in the space."
              },
              "tabId": {
                "type": "integer",
                "optional": true,
                "description": "Limits the change to when a particular tab is selected. Automatically resets when the tab is closed."
              }
            }
          }
        ]
      },
      {
        "name": "getBadgeText",
        "type": "function",
        "description": "Gets the badge text of the browser action. If no tab is specified, the non-tab-specific badge text is returned.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "properties": {
              "tabId": {
                "type": "integer",
                "optional": true,
                "description": "Specify the tab to get the badge text from. If no tab is specified, the non-tab-specific badge text is returned."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "result",
                "type": "string"
              }
            ]
          }
        ]
      },
      {
        "name": "setBadgeBackgroundColor",
        "type": "function",
        "description": "Sets the background color for the badge.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "properties": {
              "color": {
                "description": "An array of four integers in the range [0,255] that make up the RGBA color of the badge. For example, opaque red is <code>[255, 0, 0, 255]</code>. Can also be a string with a CSS value, with opaque red being <code>#FF0000</code> or <code>#F00</code>.",
                "choices": [
                  {
                    "type": "string"
                  },
                  {
                    "$ref": "ColorArray"
                  }
                ]
              },
              "tabId": {
                "type": "integer",
                "optional": true,
                "description": "Limits the change to when a particular tab is selected. Automatically resets when the tab is closed."
              }
            }
          }
        ]
      },
      {
        "name": "getBadgeBackgroundColor",
        "type": "function",
        "description": "Gets the background color of the browser action.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "properties": {
              "tabId": {
                "type": "integer",
                "optional": true,
                "description": "Specify the tab to get the badge background color from. If no tab is specified, the non-tab-specific badge background color is returned."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "result",
                "$ref": "ColorArray"
              }
            ]
          }
        ]
      },
      {
        "name": "enable",
        "type": "function",
        "description": "Enables the browser action for a tab. By default, browser actions are enabled.",
        "parameters": [
          {
            "type": "integer",
            "optional": true,
            "name": "tabId",
            "minimum": 0,
            "description": "The id of the tab for which you want to modify the browser action."
          }
        ]
      },
      {
        "name": "disable",
        "type": "function",
        "description": "Disables the browser action for a tab.",
        "parameters": [
          {
            "type": "integer",
            "optional": true,
            "name": "tabId",
            "minimum": 0,
            "description": "The id of the tab for which you want to modify the browser action."
          }
        ]
      },
      {
        "name": "openPopup",
        "type": "function",
        "description": "Opens the extension popup window in the active window but does not grant tab permissions.",
        "nodoc": true,
        "parameters": [
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "popupView",
                "type": "object",
                "optional": true,
                "description": "JavaScript 'window' object for the popup window if it was succesfully opened.",
                "additionalProperties": {
                  "type": "any"
                }
              }
            ]
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onClicked",
        "type": "function",
        "description": "Fired when a browser action icon is clicked.  This event will not fire if the browser action has a popup.",
        "parameters": [
          {
            "name": "tab",
            "$ref": "tabs.Tab"
          }
        ]
      }
    ],
    "dependencies": [
      "manifest:browser_action"
    ]
  },
  {
    "namespace": "browsingData",
    "description": "Use the <code>chrome.browsingData</code> API to remove browsing data from a user's local profile.",
    "types": [
      {
        "id": "RemovalOptions",
        "type": "object",
        "description": "Options that determine exactly what data will be removed.",
        "properties": {
          "since": {
            "type": "number",
            "optional": true,
            "description": "Remove data accumulated on or after this date, represented in milliseconds since the epoch (accessible via the <code>getTime</code> method of the JavaScript <code>Date</code> object). If absent, defaults to 0 (which would remove all browsing data)."
          },
          "originTypes": {
            "type": "object",
            "optional": true,
            "description": "An object whose properties specify which origin types ought to be cleared. If this object isn't specified, it defaults to clearing only \"unprotected\" origins. Please ensure that you <em>really</em> want to remove application data before adding 'protectedWeb' or 'extensions'.",
            "properties": {
              "unprotectedWeb": {
                "type": "boolean",
                "optional": true,
                "description": "Normal websites."
              },
              "protectedWeb": {
                "type": "boolean",
                "optional": true,
                "description": "Websites that have been installed as hosted applications (be careful!)."
              },
              "extension": {
                "type": "boolean",
                "optional": true,
                "description": "Extensions and packaged applications a user has installed (be _really_ careful!)."
              }
            }
          }
        }
      },
      {
        "id": "DataTypeSet",
        "type": "object",
        "description": "A set of data types. Missing data types are interpreted as <code>false</code>.",
        "properties": {
          "appcache": {
            "type": "boolean",
            "optional": true,
            "description": "Websites' appcaches."
          },
          "cache": {
            "type": "boolean",
            "optional": true,
            "description": "The browser's cache. Note: when removing data, this clears the <em>entire</em> cache: it is not limited to the range you specify."
          },
          "cookies": {
            "type": "boolean",
            "optional": true,
            "description": "The browser's cookies."
          },
          "downloads": {
            "type": "boolean",
            "optional": true,
            "description": "The browser's download list."
          },
          "fileSystems": {
            "type": "boolean",
            "optional": true,
            "description": "Websites' file systems."
          },
          "formData": {
            "type": "boolean",
            "optional": true,
            "description": "The browser's stored form data."
          },
          "history": {
            "type": "boolean",
            "optional": true,
            "description": "The browser's history."
          },
          "indexedDB": {
            "type": "boolean",
            "optional": true,
            "description": "Websites' IndexedDB data."
          },
          "localStorage": {
            "type": "boolean",
            "optional": true,
            "description": "Websites' local storage data."
          },
          "serverBoundCertificates": {
            "type": "boolean",
            "optional": true,
            "description": "Server-bound certificates."
          },
          "passwords": {
            "type": "boolean",
            "optional": true,
            "description": "Stored passwords."
          },
          "pluginData": {
            "type": "boolean",
            "optional": true,
            "description": "Plugins' data."
          },
          "serviceWorkers": {
            "type": "boolean",
            "optional": true,
            "description": "Service Workers."
          },
          "webSQL": {
            "type": "boolean",
            "optional": true,
            "description": "Websites' WebSQL data."
          }
        }
      }
    ],
    "functions": [
      {
        "name": "settings",
        "description": "Reports which types of data are currently selected in the 'Clear browsing data' settings UI.  Note: some of the data types included in this API are not available in the settings UI, and some UI settings control more than one data type listed here.",
        "type": "function",
        "parameters": [
          {
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "name": "result",
                "type": "object",
                "properties": {
                  "options": {
                    "$ref": "RemovalOptions"
                  },
                  "dataToRemove": {
                    "$ref": "DataTypeSet",
                    "description": "All of the types will be present in the result, with values of <code>true</code> if they are both selected to be removed and permitted to be removed, otherwise <code>false</code>."
                  },
                  "dataRemovalPermitted": {
                    "$ref": "DataTypeSet",
                    "description": "All of the types will be present in the result, with values of <code>true</code> if they are permitted to be removed (e.g., by enterprise policy) and <code>false</code> if not."
                  }
                }
              }
            ]
          }
        ]
      },
      {
        "name": "remove",
        "description": "Clears various types of browsing data stored in a user's profile.",
        "type": "function",
        "parameters": [
          {
            "$ref": "RemovalOptions",
            "name": "options"
          },
          {
            "name": "dataToRemove",
            "$ref": "DataTypeSet",
            "description": "The set of data types to remove."
          },
          {
            "name": "callback",
            "type": "function",
            "description": "Called when deletion has completed.",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "removeAppcache",
        "description": "Clears websites' appcache data.",
        "type": "function",
        "parameters": [
          {
            "$ref": "RemovalOptions",
            "name": "options"
          },
          {
            "name": "callback",
            "type": "function",
            "description": "Called when websites' appcache data has been cleared.",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "removeCache",
        "description": "Clears the browser's cache.",
        "type": "function",
        "parameters": [
          {
            "$ref": "RemovalOptions",
            "name": "options"
          },
          {
            "name": "callback",
            "type": "function",
            "description": "Called when the browser's cache has been cleared.",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "removeCookies",
        "description": "Clears the browser's cookies and server-bound certificates modified within a particular timeframe.",
        "type": "function",
        "parameters": [
          {
            "$ref": "RemovalOptions",
            "name": "options"
          },
          {
            "name": "callback",
            "type": "function",
            "description": "Called when the browser's cookies and server-bound certificates have been cleared.",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "removeDownloads",
        "description": "Clears the browser's list of downloaded files (<em>not</em> the downloaded files themselves).",
        "type": "function",
        "parameters": [
          {
            "$ref": "RemovalOptions",
            "name": "options"
          },
          {
            "name": "callback",
            "type": "function",
            "description": "Called when the browser's list of downloaded files has been cleared.",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "removeFileSystems",
        "description": "Clears websites' file system data.",
        "type": "function",
        "parameters": [
          {
            "$ref": "RemovalOptions",
            "name": "options"
          },
          {
            "name": "callback",
            "type": "function",
            "description": "Called when websites' file systems have been cleared.",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "removeFormData",
        "description": "Clears the browser's stored form data (autofill).",
        "type": "function",
        "parameters": [
          {
            "$ref": "RemovalOptions",
            "name": "options"
          },
          {
            "name": "callback",
            "type": "function",
            "description": "Called when the browser's form data has been cleared.",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "removeHistory",
        "description": "Clears the browser's history.",
        "type": "function",
        "parameters": [
          {
            "$ref": "RemovalOptions",
            "name": "options"
          },
          {
            "name": "callback",
            "type": "function",
            "description": "Called when the browser's history has cleared.",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "removeIndexedDB",
        "description": "Clears websites' IndexedDB data.",
        "type": "function",
        "parameters": [
          {
            "$ref": "RemovalOptions",
            "name": "options"
          },
          {
            "name": "callback",
            "type": "function",
            "description": "Called when websites' IndexedDB data has been cleared.",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "removeLocalStorage",
        "description": "Clears websites' local storage data.",
        "type": "function",
        "parameters": [
          {
            "$ref": "RemovalOptions",
            "name": "options"
          },
          {
            "name": "callback",
            "type": "function",
            "description": "Called when websites' local storage has been cleared.",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "removePluginData",
        "description": "Clears plugins' data.",
        "type": "function",
        "parameters": [
          {
            "$ref": "RemovalOptions",
            "name": "options"
          },
          {
            "name": "callback",
            "type": "function",
            "description": "Called when plugins' data has been cleared.",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "removePasswords",
        "description": "Clears the browser's stored passwords.",
        "type": "function",
        "parameters": [
          {
            "$ref": "RemovalOptions",
            "name": "options"
          },
          {
            "name": "callback",
            "type": "function",
            "description": "Called when the browser's passwords have been cleared.",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "removeWebSQL",
        "description": "Clears websites' WebSQL data.",
        "type": "function",
        "parameters": [
          {
            "$ref": "RemovalOptions",
            "name": "options"
          },
          {
            "name": "callback",
            "type": "function",
            "description": "Called when websites' WebSQL databases have been cleared.",
            "optional": true,
            "parameters": []
          }
        ]
      }
    ],
    "dependencies": [
      "permission:browsingData"
    ]
  },
  {
    "namespace": "commands",
    "description": "Use the commands API to add keyboard shortcuts that trigger actions in your extension, for example, an action to open the browser action or send a command to the extension.",
    "types": [
      {
        "id": "Command",
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "optional": true,
            "description": "The name of the Extension Command"
          },
          "description": {
            "type": "string",
            "optional": true,
            "description": "The Extension Command description"
          },
          "shortcut": {
            "type": "string",
            "optional": true,
            "description": "The shortcut active for this command, or blank if not active."
          }
        }
      }
    ],
    "events": [
      {
        "name": "onCommand",
        "description": "Fired when a registered command is activated using a keyboard shortcut.",
        "type": "function",
        "parameters": [
          {
            "name": "command",
            "type": "string"
          }
        ]
      }
    ],
    "functions": [
      {
        "name": "getAll",
        "type": "function",
        "description": "Returns all the registered extension commands for this extension and their shortcut (if active).",
        "parameters": [
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": [
              {
                "name": "commands",
                "type": "array",
                "items": {
                  "$ref": "Command"
                }
              }
            ],
            "description": "Called to return the registered commands."
          }
        ]
      }
    ],
    "dependencies": [
      "manifest:commands"
    ]
  },
  {
    "namespace": "contentSettings",
    "description": "Use the <code>chrome.contentSettings</code> API to change settings that control whether websites can use features such as cookies, JavaScript, and plugins. More generally speaking, content settings allow you to customize Chrome's behavior on a per-site basis instead of globally.",
    "compiler_options": {
      "generate_type_functions": true
    },
    "types": [
      {
        "id": "ResourceIdentifier",
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "The resource identifier for the given content type."
          },
          "description": {
            "type": "string",
            "optional": true,
            "description": "A human readable description of the resource."
          }
        },
        "description": "The only content type using resource identifiers is $(ref:contentSettings.plugins). For more information, see <a href=\"contentSettings#resource-identifiers\">Resource Identifiers</a>."
      },
      {
        "id": "Scope",
        "type": "string",
        "enum": [
          "regular",
          "incognito_session_only"
        ],
        "description": "The scope of the ContentSetting. One of<br><var>regular</var>: setting for regular profile (which is inherited by the incognito profile if not overridden elsewhere),<br><var>incognito_session_only</var>: setting for incognito profile that can only be set during an incognito session and is deleted when the incognito session ends (overrides regular settings)."
      },
      {
        "id": "ContentSetting",
        "js_module": "ContentSetting",
        "type": "object",
        "functions": [
          {
            "name": "clear",
            "type": "function",
            "description": "Clear all content setting rules set by this extension.",
            "parameters": [
              {
                "name": "details",
                "type": "object",
                "properties": {
                  "scope": {
                    "$ref": "Scope",
                    "optional": true,
                    "description": "Where to clear the setting (default: regular)."
                  }
                }
              },
              {
                "type": "function",
                "name": "callback",
                "optional": true,
                "parameters": []
              }
            ]
          },
          {
            "name": "get",
            "type": "function",
            "description": "Gets the current content setting for a given pair of URLs.",
            "parameters": [
              {
                "name": "details",
                "type": "object",
                "properties": {
                  "primaryUrl": {
                    "type": "string",
                    "description": "The primary URL for which the content setting should be retrieved. Note that the meaning of a primary URL depends on the content type."
                  },
                  "secondaryUrl": {
                    "type": "string",
                    "description": "The secondary URL for which the content setting should be retrieved. Defaults to the primary URL. Note that the meaning of a secondary URL depends on the content type, and not all content types use secondary URLs.",
                    "optional": true
                  },
                  "resourceIdentifier": {
                    "$ref": "ResourceIdentifier",
                    "optional": true,
                    "description": "A more specific identifier of the type of content for which the settings should be retrieved."
                  },
                  "incognito": {
                    "type": "boolean",
                    "optional": true,
                    "description": "Whether to check the content settings for an incognito session. (default false)"
                  }
                }
              },
              {
                "type": "function",
                "name": "callback",
                "parameters": [
                  {
                    "name": "details",
                    "type": "object",
                    "properties": {
                      "setting": {
                        "type": "any",
                        "description": "The content setting. See the description of the individual ContentSetting objects for the possible values."
                      }
                    }
                  }
                ]
              }
            ]
          },
          {
            "name": "set",
            "type": "function",
            "description": "Applies a new content setting rule.",
            "parameters": [
              {
                "name": "details",
                "type": "object",
                "properties": {
                  "primaryPattern": {
                    "type": "string",
                    "description": "The pattern for the primary URL. For details on the format of a pattern, see <a href='contentSettings#patterns'>Content Setting Patterns</a>."
                  },
                  "secondaryPattern": {
                    "type": "string",
                    "description": "The pattern for the secondary URL. Defaults to matching all URLs. For details on the format of a pattern, see <a href='contentSettings#patterns'>Content Setting Patterns</a>.",
                    "optional": true
                  },
                  "resourceIdentifier": {
                    "$ref": "ResourceIdentifier",
                    "optional": true,
                    "description": "The resource identifier for the content type."
                  },
                  "setting": {
                    "type": "any",
                    "description": "The setting applied by this rule. See the description of the individual ContentSetting objects for the possible values."
                  },
                  "scope": {
                    "$ref": "Scope",
                    "optional": true,
                    "description": "Where to set the setting (default: regular)."
                  }
                }
              },
              {
                "type": "function",
                "name": "callback",
                "optional": true,
                "parameters": []
              }
            ]
          },
          {
            "name": "getResourceIdentifiers",
            "type": "function",
            "description": "",
            "parameters": [
              {
                "name": "callback",
                "type": "function",
                "parameters": [
                  {
                    "name": "resourceIdentifiers",
                    "type": "array",
                    "description": "A list of resource identifiers for this content type, or <var>undefined</var> if this content type does not use resource identifiers.",
                    "optional": true,
                    "items": {
                      "$ref": "ResourceIdentifier"
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "CookiesContentSetting",
        "type": "string",
        "enum": [
          "allow",
          "block",
          "session_only"
        ]
      },
      {
        "id": "ImagesContentSetting",
        "type": "string",
        "enum": [
          "allow",
          "block"
        ]
      },
      {
        "id": "JavascriptContentSetting",
        "type": "string",
        "enum": [
          "allow",
          "block"
        ]
      },
      {
        "id": "LocationContentSetting",
        "type": "string",
        "enum": [
          "allow",
          "block",
          "ask"
        ]
      },
      {
        "id": "PluginsContentSetting",
        "type": "string",
        "enum": [
          "allow",
          "block",
          "detect_important_content"
        ]
      },
      {
        "id": "PopupsContentSetting",
        "type": "string",
        "enum": [
          "allow",
          "block"
        ]
      },
      {
        "id": "NotificationsContentSetting",
        "type": "string",
        "enum": [
          "allow",
          "block",
          "ask"
        ]
      },
      {
        "id": "FullscreenContentSetting",
        "type": "string",
        "enum": [
          "allow",
          "ask"
        ]
      },
      {
        "id": "MouselockContentSetting",
        "type": "string",
        "enum": [
          "allow",
          "block",
          "ask"
        ]
      },
      {
        "id": "MicrophoneContentSetting",
        "type": "string",
        "enum": [
          "allow",
          "block",
          "ask"
        ]
      },
      {
        "id": "CameraContentSetting",
        "type": "string",
        "enum": [
          "allow",
          "block",
          "ask"
        ]
      },
      {
        "id": "PpapiBrokerContentSetting",
        "type": "string",
        "enum": [
          "allow",
          "block",
          "ask"
        ]
      },
      {
        "id": "MultipleAutomaticDownloadsContentSetting",
        "type": "string",
        "enum": [
          "allow",
          "block",
          "ask"
        ]
      }
    ],
    "properties": {
      "cookies": {
        "$ref": "ContentSetting",
        "description": "Whether to allow cookies and other local data to be set by websites. One of<br><var>allow</var>: Accept cookies,<br><var>block</var>: Block cookies,<br><var>session_only</var>: Accept cookies only for the current session. <br>Default is <var>allow</var>.<br>The primary URL is the URL representing the cookie origin. The secondary URL is the URL of the top-level frame.",
        "value": [
          "cookies",
          {
            "$ref": "CookiesContentSetting"
          }
        ]
      },
      "images": {
        "$ref": "ContentSetting",
        "description": "Whether to show images. One of<br><var>allow</var>: Show images,<br><var>block</var>: Don't show images. <br>Default is <var>allow</var>.<br>The primary URL is the URL of the top-level frame. The secondary URL is the URL of the image.",
        "value": [
          "images",
          {
            "$ref": "ImagesContentSetting"
          }
        ]
      },
      "javascript": {
        "$ref": "ContentSetting",
        "description": "Whether to run JavaScript. One of<br><var>allow</var>: Run JavaScript,<br><var>block</var>: Don't run JavaScript. <br>Default is <var>allow</var>.<br>The primary URL is the URL of the top-level frame. The secondary URL is not used.",
        "value": [
          "javascript",
          {
            "$ref": "JavascriptContentSetting"
          }
        ]
      },
      "location": {
        "$ref": "ContentSetting",
        "description": "Whether to allow Geolocation. One of <br><var>allow</var>: Allow sites to track your physical location,<br><var>block</var>: Don't allow sites to track your physical location,<br><var>ask</var>: Ask before allowing sites to track your physical location. <br>Default is <var>ask</var>.<br>The primary URL is the URL of the document which requested location data. The secondary URL is the URL of the top-level frame (which may or may not differ from the requesting URL).",
        "value": [
          "geolocation",
          {
            "$ref": "LocationContentSetting"
          }
        ]
      },
      "plugins": {
        "$ref": "ContentSetting",
        "description": "Whether to run plugins. One of<br><var>allow</var>: Run plugins automatically,<br><var>block</var>: Don't run plugins automatically,<br><var>detect_important_content</var>: Only run automatically those plugins that are detected as the website's main content.<br>The primary URL is the URL of the top-level frame. The secondary URL is not used.",
        "value": [
          "plugins",
          {
            "$ref": "PluginsContentSetting"
          }
        ]
      },
      "popups": {
        "$ref": "ContentSetting",
        "description": "Whether to allow sites to show pop-ups. One of<br><var>allow</var>: Allow sites to show pop-ups,<br><var>block</var>: Don't allow sites to show pop-ups. <br>Default is <var>block</var>.<br>The primary URL is the URL of the top-level frame. The secondary URL is not used.",
        "value": [
          "popups",
          {
            "$ref": "PopupsContentSetting"
          }
        ]
      },
      "notifications": {
        "$ref": "ContentSetting",
        "description": "Whether to allow sites to show desktop notifications. One of<br><var>allow</var>: Allow sites to show desktop notifications,<br><var>block</var>: Don't allow sites to show desktop notifications,<br><var>ask</var>: Ask when a site wants to show desktop notifications. <br>Default is <var>ask</var>.<br>The primary URL is the URL of the document which wants to show the notification. The secondary URL is not used.",
        "value": [
          "notifications",
          {
            "$ref": "NotificationsContentSetting"
          }
        ]
      },
      "fullscreen": {
        "$ref": "ContentSetting",
        "description": "Whether to allow sites to toggle the fullscreen mode. One of<br><var>allow</var>: Allow sites to toggle the fullscreen mode,<br><var>ask</var>: Ask when a site wants to toggle the fullscreen mode. <br>Default is <var>ask</var>.<br>The primary URL is the URL of the document which requested to toggle the fullscreen mode. The secondary URL is the URL of the top-level frame (which may or may not differ from the requesting URL).",
        "value": [
          "fullscreen",
          {
            "$ref": "FullscreenContentSetting"
          }
        ]
      },
      "mouselock": {
        "$ref": "ContentSetting",
        "description": "Whether to allow sites to disable the mouse cursor. One of <br><var>allow</var>: Allow sites to disable the mouse cursor,<br><var>block</var>: Don't allow sites to disable the mouse cursor,<br><var>ask</var>: Ask when a site wants to disable the mouse cursor. <br>Default is <var>ask</var>.<br>The primary URL is the URL of the top-level frame. The secondary URL is not used.",
        "value": [
          "mouselock",
          {
            "$ref": "MouselockContentSetting"
          }
        ]
      },
      "microphone": {
        "$ref": "ContentSetting",
        "description": "Whether to allow sites to access the microphone. One of <br><var>allow</var>: Allow sites to access the microphone,<br><var>block</var>: Don't allow sites to access the microphone,<br><var>ask</var>: Ask when a site wants to access the microphone. <br>Default is <var>ask</var>.<br>The primary URL is the URL of the document which requested microphone access. The secondary URL is not used.<br>NOTE: The 'allow' setting is not valid if both patterns are '<all_urls>'.",
        "value": [
          "media-stream-mic",
          {
            "$ref": "MicrophoneContentSetting"
          }
        ]
      },
      "camera": {
        "$ref": "ContentSetting",
        "description": "Whether to allow sites to access the camera. One of <br><var>allow</var>: Allow sites to access the camera,<br><var>block</var>: Don't allow sites to access the camera,<br><var>ask</var>: Ask when a site wants to access the camera. <br>Default is <var>ask</var>.<br>The primary URL is the URL of the document which requested camera access. The secondary URL is not used.<br>NOTE: The 'allow' setting is not valid if both patterns are '<all_urls>'.",
        "value": [
          "media-stream-camera",
          {
            "$ref": "CameraContentSetting"
          }
        ]
      },
      "unsandboxedPlugins": {
        "$ref": "ContentSetting",
        "description": "Whether to allow sites to run plugins unsandboxed. One of <br><var>allow</var>: Allow sites to run plugins unsandboxed,<br><var>block</var>: Don't allow sites to run plugins unsandboxed,<br><var>ask</var>: Ask when a site wants to run a plugin unsandboxed. <br>Default is <var>ask</var>.<br>The primary URL is the URL of the top-level frame. The secondary URL is not used.",
        "value": [
          "ppapi-broker",
          {
            "$ref": "PpapiBrokerContentSetting"
          }
        ]
      },
      "automaticDownloads": {
        "$ref": "ContentSetting",
        "description": "Whether to allow sites to download multiple files automatically. One of <br><var>allow</var>: Allow sites to download multiple files automatically,<br><var>block</var>: Don't allow sites to download multiple files automatically,<br><var>ask</var>: Ask when a site wants to download files automatically after the first file. <br>Default is <var>ask</var>.<br>The primary URL is the URL of the top-level frame. The secondary URL is not used.",
        "value": [
          "automatic-downloads",
          {
            "$ref": "MultipleAutomaticDownloadsContentSetting"
          }
        ]
      }
    },
    "dependencies": [
      "permission:contentSettings"
    ]
  },
  {
    "namespace": "contextMenus",
    "description": "Use the <code>chrome.contextMenus</code> API to add items to Google Chrome's context menu. You can choose what types of objects your context menu additions apply to, such as images, hyperlinks, and pages.",
    "properties": {
      "ACTION_MENU_TOP_LEVEL_LIMIT": {
        "value": 6,
        "description": "The maximum number of top level extension items that can be added to an extension action context menu. Any items beyond this limit will be ignored."
      }
    },
    "types": [
      {
        "id": "ContextType",
        "type": "string",
        "enum": [
          "all",
          "page",
          "frame",
          "selection",
          "link",
          "editable",
          "image",
          "video",
          "audio",
          "launcher",
          "browser_action",
          "page_action"
        ],
        "description": "The different contexts a menu can appear in. Specifying 'all' is equivalent to the combination of all other contexts except for 'launcher'. The 'launcher' context is only supported by apps and is used to add menu items to the context menu that appears when clicking on the app icon in the launcher/taskbar/dock/etc. Different platforms might put limitations on what is actually supported in a launcher context menu."
      },
      {
        "id": "ItemType",
        "type": "string",
        "enum": [
          "normal",
          "checkbox",
          "radio",
          "separator"
        ],
        "description": "The type of menu item."
      }
    ],
    "functions": [
      {
        "name": "create",
        "type": "function",
        "description": "Creates a new context menu item. Note that if an error occurs during creation, you may not find out until the creation callback fires (the details will be in chrome.runtime.lastError).",
        "returns": {
          "choices": [
            {
              "type": "integer"
            },
            {
              "type": "string"
            }
          ],
          "description": "The ID of the newly created item."
        },
        "parameters": [
          {
            "type": "object",
            "name": "createProperties",
            "properties": {
              "type": {
                "$ref": "ItemType",
                "optional": true,
                "description": "The type of menu item. Defaults to 'normal' if not specified."
              },
              "id": {
                "type": "string",
                "optional": true,
                "description": "The unique ID to assign to this item. Mandatory for event pages. Cannot be the same as another ID for this extension."
              },
              "title": {
                "type": "string",
                "optional": true,
                "description": "The text to be displayed in the item; this is <em>required</em> unless <code>type</code> is 'separator'. When the context is 'selection', you can use <code>%s</code> within the string to show the selected text. For example, if this parameter's value is \"Translate '%s' to Pig Latin\" and the user selects the word \"cool\", the context menu item for the selection is \"Translate 'cool' to Pig Latin\"."
              },
              "checked": {
                "type": "boolean",
                "optional": true,
                "description": "The initial state of a checkbox or radio item: true for selected and false for unselected. Only one radio item can be selected at a time in a given group of radio items."
              },
              "contexts": {
                "type": "array",
                "items": {
                  "$ref": "ContextType"
                },
                "minItems": 1,
                "optional": true,
                "description": "List of contexts this menu item will appear in. Defaults to ['page'] if not specified."
              },
              "onclick": {
                "type": "function",
                "optional": true,
                "description": "A function that will be called back when the menu item is clicked. Event pages cannot use this; instead, they should register a listener for chrome.contextMenus.onClicked.",
                "parameters": [
                  {
                    "name": "info",
                    "$ref": "contextMenusInternal.OnClickData",
                    "description": "Information about the item clicked and the context where the click happened."
                  },
                  {
                    "name": "tab",
                    "$ref": "tabs.Tab",
                    "description": "The details of the tab where the click took place. Note: this parameter only present for extensions."
                  }
                ]
              },
              "parentId": {
                "choices": [
                  {
                    "type": "integer"
                  },
                  {
                    "type": "string"
                  }
                ],
                "optional": true,
                "description": "The ID of a parent menu item; this makes the item a child of a previously added item."
              },
              "documentUrlPatterns": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "optional": true,
                "description": "Lets you restrict the item to apply only to documents whose URL matches one of the given patterns. (This applies to frames as well.) For details on the format of a pattern, see <a href='match_patterns'>Match Patterns</a>."
              },
              "targetUrlPatterns": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "optional": true,
                "description": "Similar to documentUrlPatterns, but lets you filter based on the src attribute of img/audio/video tags and the href of anchor tags."
              },
              "enabled": {
                "type": "boolean",
                "optional": true,
                "description": "Whether this context menu item is enabled or disabled. Defaults to true."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "description": "Called when the item has been created in the browser. If there were any problems creating the item, details will be available in chrome.runtime.lastError.",
            "parameters": []
          }
        ]
      },
      {
        "name": "update",
        "type": "function",
        "description": "Updates a previously created context menu item.",
        "parameters": [
          {
            "choices": [
              {
                "type": "integer"
              },
              {
                "type": "string"
              }
            ],
            "name": "id",
            "description": "The ID of the item to update."
          },
          {
            "type": "object",
            "name": "updateProperties",
            "description": "The properties to update. Accepts the same values as the create function.",
            "properties": {
              "type": {
                "$ref": "ItemType",
                "optional": true
              },
              "title": {
                "type": "string",
                "optional": true
              },
              "checked": {
                "type": "boolean",
                "optional": true
              },
              "contexts": {
                "type": "array",
                "items": {
                  "$ref": "ContextType"
                },
                "minItems": 1,
                "optional": true
              },
              "onclick": {
                "type": "function",
                "optional": true,
                "parameters": [
                  {
                    "name": "info",
                    "$ref": "contextMenusInternal.OnClickData"
                  },
                  {
                    "name": "tab",
                    "$ref": "tabs.Tab",
                    "description": "The details of the tab where the click took place. Note: this parameter only present for extensions."
                  }
                ]
              },
              "parentId": {
                "choices": [
                  {
                    "type": "integer"
                  },
                  {
                    "type": "string"
                  }
                ],
                "optional": true,
                "description": "Note: You cannot change an item to be a child of one of its own descendants."
              },
              "documentUrlPatterns": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "optional": true
              },
              "targetUrlPatterns": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "optional": true
              },
              "enabled": {
                "type": "boolean",
                "optional": true
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": [],
            "description": "Called when the context menu has been updated."
          }
        ]
      },
      {
        "name": "remove",
        "type": "function",
        "description": "Removes a context menu item.",
        "parameters": [
          {
            "choices": [
              {
                "type": "integer"
              },
              {
                "type": "string"
              }
            ],
            "name": "menuItemId",
            "description": "The ID of the context menu item to remove."
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": [],
            "description": "Called when the context menu has been removed."
          }
        ]
      },
      {
        "name": "removeAll",
        "type": "function",
        "description": "Removes all context menu items added by this extension.",
        "parameters": [
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": [],
            "description": "Called when removal is complete."
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onClicked",
        "type": "function",
        "$ref": "contextMenusInternal.onClicked"
      }
    ],
    "dependencies": [
      "permission:contextMenus"
    ]
  },
  {
    "namespace": "cookies",
    "description": "Use the <code>chrome.cookies</code> API to query and modify cookies, and to be notified when they change.",
    "types": [
      {
        "id": "SameSiteStatus",
        "type": "string",
        "enum": [
          "no_restriction",
          "lax",
          "strict"
        ],
        "description": "A cookie's 'SameSite' state (https://tools.ietf.org/html/draft-west-first-party-cookies). 'no_restriction' corresponds to a cookie set without a 'SameSite' attribute, 'lax' to 'SameSite=Lax', and 'strict' to 'SameSite=Strict'."
      },
      {
        "id": "Cookie",
        "type": "object",
        "description": "Represents information about an HTTP cookie.",
        "properties": {
          "name": {
            "type": "string",
            "description": "The name of the cookie."
          },
          "value": {
            "type": "string",
            "description": "The value of the cookie."
          },
          "domain": {
            "type": "string",
            "description": "The domain of the cookie (e.g. \"www.google.com\", \"example.com\")."
          },
          "hostOnly": {
            "type": "boolean",
            "description": "True if the cookie is a host-only cookie (i.e. a request's host must exactly match the domain of the cookie)."
          },
          "path": {
            "type": "string",
            "description": "The path of the cookie."
          },
          "secure": {
            "type": "boolean",
            "description": "True if the cookie is marked as Secure (i.e. its scope is limited to secure channels, typically HTTPS)."
          },
          "httpOnly": {
            "type": "boolean",
            "description": "True if the cookie is marked as HttpOnly (i.e. the cookie is inaccessible to client-side scripts)."
          },
          "sameSite": {
            "$ref": "SameSiteStatus",
            "description": "The cookie's same-site status (i.e. whether the cookie is sent with cross-site requests)."
          },
          "session": {
            "type": "boolean",
            "description": "True if the cookie is a session cookie, as opposed to a persistent cookie with an expiration date."
          },
          "expirationDate": {
            "type": "number",
            "optional": true,
            "description": "The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies."
          },
          "storeId": {
            "type": "string",
            "description": "The ID of the cookie store containing this cookie, as provided in getAllCookieStores()."
          }
        }
      },
      {
        "id": "CookieStore",
        "type": "object",
        "description": "Represents a cookie store in the browser. An incognito mode window, for instance, uses a separate cookie store from a non-incognito window.",
        "properties": {
          "id": {
            "type": "string",
            "description": "The unique identifier for the cookie store."
          },
          "tabIds": {
            "type": "array",
            "items": {
              "type": "integer"
            },
            "description": "Identifiers of all the browser tabs that share this cookie store."
          }
        }
      },
      {
        "id": "OnChangedCause",
        "type": "string",
        "enum": [
          "evicted",
          "expired",
          "explicit",
          "expired_overwrite",
          "overwrite"
        ],
        "description": "The underlying reason behind the cookie's change. If a cookie was inserted, or removed via an explicit call to \"chrome.cookies.remove\", \"cause\" will be \"explicit\". If a cookie was automatically removed due to expiry, \"cause\" will be \"expired\". If a cookie was removed due to being overwritten with an already-expired expiration date, \"cause\" will be set to \"expired_overwrite\".  If a cookie was automatically removed due to garbage collection, \"cause\" will be \"evicted\".  If a cookie was automatically removed due to a \"set\" call that overwrote it, \"cause\" will be \"overwrite\". Plan your response accordingly."
      }
    ],
    "functions": [
      {
        "name": "get",
        "type": "function",
        "description": "Retrieves information about a single cookie. If more than one cookie of the same name exists for the given URL, the one with the longest path will be returned. For cookies with the same path length, the cookie with the earliest creation time will be returned.",
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "description": "Details to identify the cookie being retrieved.",
            "properties": {
              "url": {
                "type": "string",
                "description": "The URL with which the cookie to retrieve is associated. This argument may be a full URL, in which case any data following the URL path (e.g. the query string) is simply ignored. If host permissions for this URL are not specified in the manifest file, the API call will fail."
              },
              "name": {
                "type": "string",
                "description": "The name of the cookie to retrieve."
              },
              "storeId": {
                "type": "string",
                "optional": true,
                "description": "The ID of the cookie store in which to look for the cookie. By default, the current execution context's cookie store will be used."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "cookie",
                "$ref": "Cookie",
                "optional": true,
                "description": "Contains details about the cookie. This parameter is null if no such cookie was found."
              }
            ]
          }
        ]
      },
      {
        "name": "getAll",
        "type": "function",
        "description": "Retrieves all cookies from a single cookie store that match the given information.  The cookies returned will be sorted, with those with the longest path first.  If multiple cookies have the same path length, those with the earliest creation time will be first.",
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "description": "Information to filter the cookies being retrieved.",
            "properties": {
              "url": {
                "type": "string",
                "optional": true,
                "description": "Restricts the retrieved cookies to those that would match the given URL."
              },
              "name": {
                "type": "string",
                "optional": true,
                "description": "Filters the cookies by name."
              },
              "domain": {
                "type": "string",
                "optional": true,
                "description": "Restricts the retrieved cookies to those whose domains match or are subdomains of this one."
              },
              "path": {
                "type": "string",
                "optional": true,
                "description": "Restricts the retrieved cookies to those whose path exactly matches this string."
              },
              "secure": {
                "type": "boolean",
                "optional": true,
                "description": "Filters the cookies by their Secure property."
              },
              "session": {
                "type": "boolean",
                "optional": true,
                "description": "Filters out session vs. persistent cookies."
              },
              "storeId": {
                "type": "string",
                "optional": true,
                "description": "The cookie store to retrieve cookies from. If omitted, the current execution context's cookie store will be used."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "cookies",
                "type": "array",
                "items": {
                  "$ref": "Cookie"
                },
                "description": "All the existing, unexpired cookies that match the given cookie info."
              }
            ]
          }
        ]
      },
      {
        "name": "set",
        "type": "function",
        "description": "Sets a cookie with the given cookie data; may overwrite equivalent cookies if they exist.",
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "description": "Details about the cookie being set.",
            "properties": {
              "url": {
                "type": "string",
                "description": "The request-URI to associate with the setting of the cookie. This value can affect the default domain and path values of the created cookie. If host permissions for this URL are not specified in the manifest file, the API call will fail."
              },
              "name": {
                "type": "string",
                "optional": true,
                "description": "The name of the cookie. Empty by default if omitted."
              },
              "value": {
                "type": "string",
                "optional": true,
                "description": "The value of the cookie. Empty by default if omitted."
              },
              "domain": {
                "type": "string",
                "optional": true,
                "description": "The domain of the cookie. If omitted, the cookie becomes a host-only cookie."
              },
              "path": {
                "type": "string",
                "optional": true,
                "description": "The path of the cookie. Defaults to the path portion of the url parameter."
              },
              "secure": {
                "type": "boolean",
                "optional": true,
                "description": "Whether the cookie should be marked as Secure. Defaults to false."
              },
              "httpOnly": {
                "type": "boolean",
                "optional": true,
                "description": "Whether the cookie should be marked as HttpOnly. Defaults to false."
              },
              "sameSite": {
                "$ref": "SameSiteStatus",
                "optional": true,
                "description": "The cookie's same-site status: defaults to 'no_restriction'."
              },
              "expirationDate": {
                "type": "number",
                "optional": true,
                "description": "The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted, the cookie becomes a session cookie."
              },
              "storeId": {
                "type": "string",
                "optional": true,
                "description": "The ID of the cookie store in which to set the cookie. By default, the cookie is set in the current execution context's cookie store."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "min_version": "11.0.674.0",
            "parameters": [
              {
                "name": "cookie",
                "$ref": "Cookie",
                "optional": true,
                "description": "Contains details about the cookie that's been set.  If setting failed for any reason, this will be \"null\", and \"chrome.runtime.lastError\" will be set."
              }
            ]
          }
        ]
      },
      {
        "name": "remove",
        "type": "function",
        "description": "Deletes a cookie by name.",
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "description": "Information to identify the cookie to remove.",
            "properties": {
              "url": {
                "type": "string",
                "description": "The URL associated with the cookie. If host permissions for this URL are not specified in the manifest file, the API call will fail."
              },
              "name": {
                "type": "string",
                "description": "The name of the cookie to remove."
              },
              "storeId": {
                "type": "string",
                "optional": true,
                "description": "The ID of the cookie store to look in for the cookie. If unspecified, the cookie is looked for by default in the current execution context's cookie store."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "min_version": "11.0.674.0",
            "parameters": [
              {
                "name": "details",
                "type": "object",
                "description": "Contains details about the cookie that's been removed.  If removal failed for any reason, this will be \"null\", and \"chrome.runtime.lastError\" will be set.",
                "optional": true,
                "properties": {
                  "url": {
                    "type": "string",
                    "description": "The URL associated with the cookie that's been removed."
                  },
                  "name": {
                    "type": "string",
                    "description": "The name of the cookie that's been removed."
                  },
                  "storeId": {
                    "type": "string",
                    "description": "The ID of the cookie store from which the cookie was removed."
                  }
                }
              }
            ]
          }
        ]
      },
      {
        "name": "getAllCookieStores",
        "type": "function",
        "description": "Lists all existing cookie stores.",
        "parameters": [
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "cookieStores",
                "type": "array",
                "items": {
                  "$ref": "CookieStore"
                },
                "description": "All the existing cookie stores."
              }
            ]
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onChanged",
        "type": "function",
        "description": "Fired when a cookie is set or removed. As a special case, note that updating a cookie's properties is implemented as a two step process: the cookie to be updated is first removed entirely, generating a notification with \"cause\" of \"overwrite\" .  Afterwards, a new cookie is written with the updated values, generating a second notification with \"cause\" \"explicit\".",
        "parameters": [
          {
            "type": "object",
            "name": "changeInfo",
            "properties": {
              "removed": {
                "type": "boolean",
                "description": "True if a cookie was removed."
              },
              "cookie": {
                "$ref": "Cookie",
                "description": "Information about the cookie that was set or removed."
              },
              "cause": {
                "min_version": "12.0.707.0",
                "$ref": "OnChangedCause",
                "description": "The underlying reason behind the cookie's change."
              }
            }
          }
        ]
      }
    ],
    "dependencies": [
      "permission:cookies"
    ]
  },
  {
    "namespace": "debugger",
    "description": "The <code>chrome.debugger</code> API serves as an alternate transport for Chrome's <a href='https://developer.chrome.com/devtools/docs/debugger-protocol'>remote debugging protocol</a>. Use <code>chrome.debugger</code> to attach to one or more tabs to instrument network interaction, debug JavaScript, mutate the DOM and CSS, etc. Use the Debuggee <code>tabId</code> to target tabs with sendCommand and route events by <code>tabId</code> from onEvent callbacks.",
    "types": [
      {
        "id": "Debuggee",
        "type": "object",
        "description": "Debuggee identifier. Either tabId or extensionId must be specified",
        "properties": {
          "tabId": {
            "type": "integer",
            "optional": true,
            "description": "The id of the tab which you intend to debug."
          },
          "extensionId": {
            "type": "string",
            "optional": true,
            "description": "The id of the extension which you intend to debug. Attaching to an extension background page is only possible when 'silent-debugger-extension-api' flag is enabled on the target browser."
          },
          "targetId": {
            "type": "string",
            "optional": true,
            "description": "The opaque id of the debug target."
          }
        }
      },
      {
        "id": "TargetInfoType",
        "type": "string",
        "description": "Target type.",
        "enum": [
          "page",
          "background_page",
          "worker",
          "other"
        ]
      },
      {
        "id": "DetachReason",
        "type": "string",
        "description": "Connection termination reason.",
        "enum": [
          "target_closed",
          "canceled_by_user",
          "replaced_with_devtools"
        ]
      },
      {
        "id": "TargetInfo",
        "type": "object",
        "description": "Debug target information",
        "properties": {
          "type": {
            "$ref": "TargetInfoType",
            "description": "Target type."
          },
          "id": {
            "type": "string",
            "description": "Target id."
          },
          "tabId": {
            "type": "integer",
            "optional": true,
            "description": "The tab id, defined if type == 'page'."
          },
          "extensionId": {
            "type": "string",
            "optional": true,
            "description": "The extension id, defined if type = 'background_page'."
          },
          "attached": {
            "type": "boolean",
            "description": "True if debugger is already attached."
          },
          "title": {
            "type": "string",
            "description": "Target page title."
          },
          "url": {
            "type": "string",
            "description": "Target URL."
          },
          "faviconUrl": {
            "type": "string",
            "optional": true,
            "description": "Target favicon URL."
          }
        }
      }
    ],
    "functions": [
      {
        "name": "attach",
        "type": "function",
        "description": "Attaches debugger to the given target.",
        "parameters": [
          {
            "$ref": "Debuggee",
            "name": "target",
            "description": "Debugging target to which you want to attach."
          },
          {
            "type": "string",
            "name": "requiredVersion",
            "description": "Required debugging protocol version (\"0.1\"). One can only attach to the debuggee with matching major version and greater or equal minor version. List of the protocol versions can be obtained <a href='https://developer.chrome.com/devtools/docs/debugger-protocol'>here</a>."
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": [],
            "description": "Called once the attach operation succeeds or fails. Callback receives no arguments. If the attach fails, $(ref:runtime.lastError) will be set to the error message."
          }
        ]
      },
      {
        "name": "detach",
        "type": "function",
        "description": "Detaches debugger from the given target.",
        "parameters": [
          {
            "$ref": "Debuggee",
            "name": "target",
            "description": "Debugging target from which you want to detach."
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": [],
            "description": "Called once the detach operation succeeds or fails. Callback receives no arguments. If the detach fails, $(ref:runtime.lastError) will be set to the error message."
          }
        ]
      },
      {
        "name": "sendCommand",
        "type": "function",
        "description": "Sends given command to the debugging target.",
        "parameters": [
          {
            "$ref": "Debuggee",
            "name": "target",
            "description": "Debugging target to which you want to send the command."
          },
          {
            "type": "string",
            "name": "method",
            "description": "Method name. Should be one of the methods defined by the <a href='https://developer.chrome.com/devtools/docs/debugger-protocol'>remote debugging protocol</a>."
          },
          {
            "type": "object",
            "name": "commandParams",
            "optional": true,
            "additionalProperties": {
              "type": "any"
            },
            "description": "JSON object with request parameters. This object must conform to the remote debugging params scheme for given method."
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": [
              {
                "type": "object",
                "name": "result",
                "optional": true,
                "additionalProperties": {
                  "type": "any"
                },
                "description": "JSON object with the response. Structure of the response varies depending on the method name and is defined by the 'returns' attribute of the command description in the remote debugging protocol."
              }
            ],
            "description": "Response body. If an error occurs while posting the message, the callback will be called with no arguments and $(ref:runtime.lastError) will be set to the error message."
          }
        ]
      },
      {
        "name": "getTargets",
        "type": "function",
        "description": "Returns the list of available debug targets.",
        "parameters": [
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "type": "array",
                "name": "result",
                "items": {
                  "$ref": "TargetInfo"
                },
                "description": "Array of TargetInfo objects corresponding to the available debug targets."
              }
            ]
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onEvent",
        "type": "function",
        "description": "Fired whenever debugging target issues instrumentation event.",
        "parameters": [
          {
            "$ref": "Debuggee",
            "name": "source",
            "description": "The debuggee that generated this event."
          },
          {
            "type": "string",
            "name": "method",
            "description": "Method name. Should be one of the notifications defined by the <a href='https://developer.chrome.com/devtools/docs/debugger-protocol'>remote debugging protocol</a>."
          },
          {
            "type": "object",
            "name": "params",
            "optional": true,
            "additionalProperties": {
              "type": "any"
            },
            "description": "JSON object with the parameters. Structure of the parameters varies depending on the method name and is defined by the 'parameters' attribute of the event description in the remote debugging protocol."
          }
        ]
      },
      {
        "name": "onDetach",
        "type": "function",
        "description": "Fired when browser terminates debugging session for the tab. This happens when either the tab is being closed or Chrome DevTools is being invoked for the attached tab.",
        "parameters": [
          {
            "$ref": "Debuggee",
            "name": "source",
            "description": "The debuggee that was detached."
          },
          {
            "$ref": "DetachReason",
            "name": "reason",
            "description": "Connection termination reason."
          }
        ]
      }
    ],
    "dependencies": [
      "permission:debugger"
    ]
  },
  {
    "namespace": "declarativeContent",
    "description": "Use the <code>chrome.declarativeContent</code> API to take actions depending on the content of a page, without requiring permission to read the page's content.",
    "types": [
      {
        "id": "ImageDataType",
        "type": "binary",
        "isInstanceOf": "ImageData",
        "additionalProperties": {
          "type": "any"
        },
        "description": "See <a href=\"https://developer.mozilla.org/en-US/docs/Web/API/ImageData\">https://developer.mozilla.org/en-US/docs/Web/API/ImageData</a>.",
        "inline_doc": true
      },
      {
        "id": "PageStateMatcherInstanceType",
        "type": "string",
        "enum": [
          "declarativeContent.PageStateMatcher"
        ]
      },
      {
        "id": "ShowPageActionInstanceType",
        "type": "string",
        "enum": [
          "declarativeContent.ShowPageAction"
        ]
      },
      {
        "id": "SetIconInstanceType",
        "type": "string",
        "enum": [
          "declarativeContent.SetIcon"
        ]
      },
      {
        "id": "RequestContentScriptInstanceType",
        "type": "string",
        "enum": [
          "declarativeContent.RequestContentScript"
        ]
      },
      {
        "id": "PageStateMatcher",
        "type": "object",
        "description": "Matches the state of a web page by various criteria.",
        "properties": {
          "pageUrl": {
            "$ref": "events.UrlFilter",
            "description": "Matches if the condition of the UrlFilter are fulfilled for the top-level URL of the page.",
            "optional": true
          },
          "css": {
            "type": "array",
            "optional": true,
            "description": "Matches if all of the CSS selectors in the array match displayed elements in a frame with the same origin as the page's main frame.  All selectors in this array must be <a href=\"http://www.w3.org/TR/selectors4/#compound\">compound selectors</a> to speed up matching.  Note that listing hundreds of CSS selectors or CSS selectors that match hundreds of times per page can still slow down web sites.",
            "items": {
              "type": "string"
            }
          },
          "isBookmarked": {
            "type": "boolean",
            "description": "Matches if the bookmarked state of the page is equal to the specified value. Requres the <a href='declare_permissions'>bookmarks permission</a>.",
            "optional": true
          },
          "instanceType": {
            "$ref": "PageStateMatcherInstanceType",
            "nodoc": true
          }
        }
      },
      {
        "id": "ShowPageAction",
        "description": "Declarative event action that shows the extension's $(ref:pageAction page action) while the corresponding conditions are met.  This action can be used without <a href=\"declare_permissions#host-permissions\">host permissions</a>, but the extension must have a page action.  If the extension takes the <a href=\"activeTab.html\">activeTab</a> permission, a click on the page action will grant access to the active tab.",
        "type": "object",
        "properties": {
          "instanceType": {
            "$ref": "ShowPageActionInstanceType",
            "nodoc": true
          }
        }
      },
      {
        "id": "SetIcon",
        "description": "Declarative event action that sets the n-<abbr title=\"device-independent pixel\">dip</abbr> square icon for the extension's $(ref:pageAction page action) or $(ref:browserAction browser action) while the corresponding conditions are met.  This action can be used without <a href=\"declare_permissions.html#host-permissions\">host permissions</a>, but the extension must have  page or browser action.<p>Exactly one of <code>imageData</code> or <code>path</code> must be specified.  Both are dictionaries mapping a number of pixels to an image representation. The image representation in <code>imageData</code> is an<a href=\"https://developer.mozilla.org/en-US/docs/Web/API/ImageData\">ImageData</a> object, for example from a <code>&lt;canvas></code> element, while the image representation in <code>path</code> is the path to an image file relative to he extension's manifest.  If <code>scale</code> screen pixels fit into a device-independent pixel, the <code>scale * n</code> icon will be used.  If that scale is missing, another image will be resized to the needed size.",
        "type": "object",
        "properties": {
          "instanceType": {
            "$ref": "SetIconInstanceType",
            "nodoc": true
          },
          "imageData": {
            "choices": [
              {
                "$ref": "ImageDataType"
              },
              {
                "type": "object",
                "additionalProperties": {
                  "type": "any"
                }
              }
            ],
            "optional": true,
            "description": "Either an ImageData object or a dictionary {size -> ImageData} representing icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals <code>scale</code>, then image with size <code>scale</code> * n will be selected, where n is the size of the icon in the UI. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'16': foo}'"
          }
        }
      },
      {
        "id": "RequestContentScript",
        "description": "Declarative event action that injects a content script. <p><b>WARNING:</b> This action is still experimental and is not supported on stable builds of Chrome.</p>",
        "type": "object",
        "properties": {
          "css": {
            "type": "array",
            "optional": true,
            "description": "Names of CSS files to be injected as a part of the content script.",
            "items": {
              "type": "string"
            }
          },
          "js": {
            "type": "array",
            "optional": true,
            "description": "Names of Javascript files to be injected as a part of the content script.",
            "items": {
              "type": "string"
            }
          },
          "allFrames": {
            "type": "boolean",
            "optional": true,
            "description": "Whether the content script runs in all frames of the matching page, or only the top frame. Default is false."
          },
          "matchAboutBlank": {
            "type": "boolean",
            "optional": true,
            "description": "Whether to insert the content script on about:blank and about:srcdoc. Default is false."
          },
          "instanceType": {
            "$ref": "RequestContentScriptInstanceType",
            "nodoc": true
          }
        }
      }
    ],
    "functions": [],
    "events": [
      {
        "name": "onPageChanged",
        "options": {
          "supportsListeners": false,
          "supportsRules": true,
          "conditions": [
            "declarativeContent.PageStateMatcher"
          ],
          "actions": [
            "declarativeContent.RequestContentScript",
            "declarativeContent.SetIcon",
            "declarativeContent.ShowPageAction"
          ]
        }
      }
    ],
    "dependencies": [
      "permission:declarativeContent"
    ]
  },
  {
    "namespace": "desktopCapture",
    "description": "Desktop Capture API that can be used to capture content of screen, individual windows or tabs.",
    "types": [
      {
        "id": "DesktopCaptureSourceType",
        "type": "string",
        "enum": [
          "screen",
          "window",
          "tab",
          "audio"
        ],
        "description": "Enum used to define set of desktop media sources used in chooseDesktopMedia()."
      }
    ],
    "functions": [
      {
        "name": "chooseDesktopMedia",
        "type": "function",
        "description": "Shows desktop media picker UI with the specified set of sources.",
        "parameters": [
          {
            "type": "array",
            "items": {
              "$ref": "DesktopCaptureSourceType"
            },
            "name": "sources",
            "description": "Set of sources that should be shown to the user."
          },
          {
            "$ref": "tabs.Tab",
            "name": "targetTab",
            "optional": true,
            "description": "Optional tab for which the stream is created. If not specified then the resulting stream can be used only by the calling extension. The stream can only be used by frames in the given tab whose security origin matches <code>tab.url</code>."
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "streamId",
                "type": "string",
                "description": "An opaque string that can be passed to <code>getUserMedia()</code> API to generate media stream that corresponds to the source selected by the user. If user didn't select any source (i.e. canceled the prompt) then the callback is called with an empty <code>streamId</code>. The created <code>streamId</code> can be used only once and expires after a few seconds when it is not used."
              }
            ]
          }
        ],
        "returns": {
          "type": "integer",
          "description": "An id that can be passed to cancelChooseDesktopMedia() in case the prompt need to be canceled."
        }
      },
      {
        "name": "cancelChooseDesktopMedia",
        "type": "function",
        "description": "Hides desktop media picker dialog shown by chooseDesktopMedia().",
        "parameters": [
          {
            "name": "desktopMediaRequestId",
            "type": "integer",
            "description": "Id returned by chooseDesktopMedia()"
          }
        ]
      }
    ]
  },
  {
    "namespace": "devtools.inspectedWindow",
    "description": "Use the <code>chrome.devtools.inspectedWindow</code> API to interact with the inspected window: obtain the tab ID for the inspected page, evaluate the code in the context of the inspected window, reload the page, or obtain the list of resources within the page.",
    "nocompile": true,
    "types": [
      {
        "id": "Resource",
        "type": "object",
        "description": "A resource within the inspected page, such as a document, a script, or an image.",
        "properties": {
          "url": {
            "type": "string",
            "description": "The URL of the resource."
          }
        },
        "functions": [
          {
            "name": "getContent",
            "type": "function",
            "description": "Gets the content of the resource.",
            "parameters": [
              {
                "name": "callback",
                "type": "function",
                "description": "A function that receives resource content when the request completes.",
                "parameters": [
                  {
                    "name": "content",
                    "type": "string",
                    "description": "Content of the resource (potentially encoded)."
                  },
                  {
                    "name": "encoding",
                    "type": "string",
                    "description": "Empty if content is not encoded, encoding name otherwise. Currently, only base64 is supported."
                  }
                ]
              }
            ]
          },
          {
            "name": "setContent",
            "type": "function",
            "description": "Sets the content of the resource.",
            "parameters": [
              {
                "name": "content",
                "type": "string",
                "description": "New content of the resource. Only resources with the text type are currently supported."
              },
              {
                "name": "commit",
                "type": "boolean",
                "description": "True if the user has finished editing the resource, and the new content of the resource should be persisted; false if this is a minor change sent in progress of the user editing the resource."
              },
              {
                "name": "callback",
                "type": "function",
                "description": "A function called upon request completion.",
                "optional": true,
                "parameters": [
                  {
                    "name": "error",
                    "type": "object",
                    "additionalProperties": {
                      "type": "any"
                    },
                    "optional": true,
                    "description": "Set to undefined if the resource content was set successfully; describes error otherwise."
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "properties": {
      "tabId": {
        "description": "The ID of the tab being inspected. This ID may be used with chrome.tabs.* API.",
        "type": "integer"
      }
    },
    "functions": [
      {
        "name": "eval",
        "type": "function",
        "description": "Evaluates a JavaScript expression in the context of the main frame of the inspected page. The expression must evaluate to a JSON-compliant object, otherwise an exception is thrown. The eval function can report either a DevTools-side error or a JavaScript exception that occurs during evaluation. In either case, the <code>result</code> parameter of the callback is <code>undefined</code>. In the case of a DevTools-side error, the <code>isException</code> parameter is non-null and has <code>isError</code> set to true and <code>code</code> set to an error code. In the case of a JavaScript error, <code>isException</code> is set to true and <code>value</code> is set to the string value of thrown object.",
        "parameters": [
          {
            "name": "expression",
            "type": "string",
            "description": "An expression to evaluate."
          },
          {
            "name": "options",
            "type": "object",
            "optional": true,
            "description": "The options parameter can contain one or more options.",
            "properties": {
              "frameURL": {
                "type": "string",
                "optional": true,
                "description": "If specified, the expression is evaluated on the iframe whose URL matches the one specified. By default, the expression is evaluated in the top frame of the inspected page."
              },
              "useContentScriptContext": {
                "type": "boolean",
                "optional": true,
                "description": "Evaluate the expression in the context of the content script of the calling extension, provided that the content script is already injected into the inspected page. If not, the expression is not evaluated and the callback is invoked with the exception parameter set to an object that has the <code>isError</code> field set to true and the <code>code</code> field set to <code>E_NOTFOUND</code>."
              },
              "contextSecurityOrigin": {
                "type": "string",
                "optional": true,
                "description": "Evaluate the expression in the context of a content script of an extension that matches the specified origin. If given, contextSecurityOrigin overrides the 'true' setting on userContentScriptContext."
              }
            }
          },
          {
            "name": "callback",
            "type": "function",
            "description": "A function called when evaluation completes.",
            "optional": true,
            "parameters": [
              {
                "name": "result",
                "type": "object",
                "additionalProperties": {
                  "type": "any"
                },
                "description": "The result of evaluation."
              },
              {
                "name": "exceptionInfo",
                "type": "object",
                "description": "An object providing details if an exception occurred while evaluating the expression.",
                "properties": {
                  "isError": {
                    "type": "boolean",
                    "description": "Set if the error occurred on the DevTools side before the expression is evaluated."
                  },
                  "code": {
                    "type": "string",
                    "description": "Set if the error occurred on the DevTools side before the expression is evaluated."
                  },
                  "description": {
                    "type": "string",
                    "description": "Set if the error occurred on the DevTools side before the expression is evaluated."
                  },
                  "details": {
                    "type": "array",
                    "items": {
                      "type": "any"
                    },
                    "description": "Set if the error occurred on the DevTools side before the expression is evaluated, contains the array of the values that may be substituted into the description string to provide more information about the cause of the error."
                  },
                  "isException": {
                    "type": "boolean",
                    "description": "Set if the evaluated code produces an unhandled exception."
                  },
                  "value": {
                    "type": "string",
                    "description": "Set if the evaluated code produces an unhandled exception."
                  }
                }
              }
            ]
          }
        ]
      },
      {
        "name": "reload",
        "type": "function",
        "description": "Reloads the inspected page.",
        "parameters": [
          {
            "type": "object",
            "name": "reloadOptions",
            "optional": true,
            "properties": {
              "ignoreCache": {
                "type": "boolean",
                "optional": true,
                "description": "When true, the loader will bypass the cache for all inspected page resources loaded before the <code>load</code> event is fired. The effect is similar to pressing Ctrl+Shift+R in the inspected window or within the Developer Tools window."
              },
              "userAgent": {
                "type": "string",
                "optional": true,
                "description": "If specified, the string will override the value of the <code>User-Agent</code> HTTP header that's sent while loading the resources of the inspected page. The string will also override the value of the <code>navigator.userAgent</code> property that's returned to any scripts that are running within the inspected page."
              },
              "injectedScript": {
                "type": "string",
                "optional": true,
                "description": "If specified, the script will be injected into every frame of the inspected page immediately upon load, before any of the frame's scripts. The script will not be injected after subsequent reloads&mdash;for example, if the user presses Ctrl+R."
              }
            }
          }
        ]
      },
      {
        "name": "getResources",
        "type": "function",
        "description": "Retrieves the list of resources from the inspected page.",
        "parameters": [
          {
            "name": "callback",
            "type": "function",
            "description": "A function that receives the list of resources when the request completes.",
            "parameters": [
              {
                "name": "resources",
                "type": "array",
                "items": {
                  "$ref": "Resource"
                },
                "description": "The resources within the page."
              }
            ]
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onResourceAdded",
        "description": "Fired when a new resource is added to the inspected page.",
        "parameters": [
          {
            "name": "resource",
            "$ref": "Resource"
          }
        ]
      },
      {
        "name": "onResourceContentCommitted",
        "description": "Fired when a new revision of the resource is committed (e.g. user saves an edited version of the resource in the Developer Tools).",
        "parameters": [
          {
            "name": "resource",
            "$ref": "Resource"
          },
          {
            "name": "content",
            "type": "string",
            "description": "New content of the resource."
          }
        ]
      }
    ],
    "dependencies": [
      "manifest:devtools_page"
    ]
  },
  {
    "namespace": "devtools.network",
    "description": "Use the <code>chrome.devtools.network</code> API to retrieve the information about network requests displayed by the Developer Tools in the Network panel.",
    "nocompile": true,
    "types": [
      {
        "id": "Request",
        "type": "object",
        "description": "Represents a network request for a document resource (script, image and so on). See HAR Specification for reference.",
        "functions": [
          {
            "name": "getContent",
            "type": "function",
            "description": "Returns content of the response body.",
            "parameters": [
              {
                "name": "callback",
                "type": "function",
                "description": "A function that receives the response body when the request completes.",
                "parameters": [
                  {
                    "name": "content",
                    "type": "string",
                    "description": "Content of the response body (potentially encoded)."
                  },
                  {
                    "name": "encoding",
                    "type": "string",
                    "description": "Empty if content is not encoded, encoding name otherwise. Currently, only base64 is supported."
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "functions": [
      {
        "name": "getHAR",
        "type": "function",
        "description": "Returns HAR log that contains all known network requests.",
        "parameters": [
          {
            "name": "callback",
            "type": "function",
            "description": "A function that receives the HAR log when the request completes.",
            "parameters": [
              {
                "name": "harLog",
                "type": "object",
                "additionalProperties": {
                  "type": "any"
                },
                "description": "A HAR log. See HAR specification for details."
              }
            ]
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onRequestFinished",
        "type": "function",
        "description": "Fired when a network request is finished and all request data are available.",
        "parameters": [
          {
            "name": "request",
            "$ref": "Request",
            "description": "Description of a network request in the form of a HAR entry. See HAR specification for details."
          }
        ]
      },
      {
        "name": "onNavigated",
        "type": "function",
        "description": "Fired when the inspected window navigates to a new page.",
        "parameters": [
          {
            "name": "url",
            "type": "string",
            "description": "URL of the new page."
          }
        ]
      }
    ],
    "dependencies": [
      "manifest:devtools_page"
    ]
  },
  {
    "namespace": "devtools.panels",
    "description": "Use the <code>chrome.devtools.panels</code> API to integrate your extension into Developer Tools window UI: create your own panels, access existing panels, and add sidebars.",
    "nocompile": true,
    "types": [
      {
        "id": "ElementsPanel",
        "type": "object",
        "description": "Represents the Elements panel.",
        "events": [
          {
            "name": "onSelectionChanged",
            "description": "Fired when an object is selected in the panel."
          }
        ],
        "functions": [
          {
            "name": "createSidebarPane",
            "type": "function",
            "description": "Creates a pane within panel's sidebar.",
            "parameters": [
              {
                "name": "title",
                "type": "string",
                "description": "Text that is displayed in sidebar caption."
              },
              {
                "name": "callback",
                "type": "function",
                "description": "A callback invoked when the sidebar is created.",
                "optional": true,
                "parameters": [
                  {
                    "name": "result",
                    "description": "An ExtensionSidebarPane object for created sidebar pane.",
                    "$ref": "ExtensionSidebarPane"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "SourcesPanel",
        "type": "object",
        "description": "Represents the Sources panel.",
        "events": [
          {
            "name": "onSelectionChanged",
            "description": "Fired when an object is selected in the panel."
          }
        ],
        "functions": [
          {
            "name": "createSidebarPane",
            "type": "function",
            "description": "Creates a pane within panel's sidebar.",
            "parameters": [
              {
                "name": "title",
                "type": "string",
                "description": "Text that is displayed in sidebar caption."
              },
              {
                "name": "callback",
                "type": "function",
                "description": "A callback invoked when the sidebar is created.",
                "optional": true,
                "parameters": [
                  {
                    "name": "result",
                    "description": "An ExtensionSidebarPane object for created sidebar pane.",
                    "$ref": "ExtensionSidebarPane"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "ExtensionPanel",
        "type": "object",
        "description": "Represents a panel created by extension.",
        "functions": [
          {
            "name": "createStatusBarButton",
            "description": "Appends a button to the status bar of the panel.",
            "parameters": [
              {
                "name": "iconPath",
                "type": "string",
                "description": "Path to the icon of the button. The file should contain a 64x24-pixel image composed of two 32x24 icons. The left icon is used when the button is inactive; the right icon is displayed when the button is pressed."
              },
              {
                "name": "tooltipText",
                "type": "string",
                "description": "Text shown as a tooltip when user hovers the mouse over the button."
              },
              {
                "name": "disabled",
                "type": "boolean",
                "description": "Whether the button is disabled."
              }
            ],
            "returns": {
              "$ref": "Button"
            }
          }
        ],
        "events": [
          {
            "name": "onSearch",
            "description": "Fired upon a search action (start of a new search, search result navigation, or search being canceled).",
            "parameters": [
              {
                "name": "action",
                "type": "string",
                "description": "Type of search action being performed."
              },
              {
                "name": "queryString",
                "type": "string",
                "optional": true,
                "description": "Query string (only for 'performSearch')."
              }
            ]
          },
          {
            "name": "onShown",
            "type": "function",
            "description": "Fired when the user switches to the panel.",
            "parameters": [
              {
                "name": "window",
                "type": "object",
                "isInstanceOf": "global",
                "additionalProperties": {
                  "type": "any"
                },
                "description": "The JavaScript <code>window</code> object of panel's page."
              }
            ]
          },
          {
            "name": "onHidden",
            "type": "function",
            "description": "Fired when the user switches away from the panel."
          }
        ]
      },
      {
        "id": "ExtensionSidebarPane",
        "type": "object",
        "description": "A sidebar created by the extension.",
        "functions": [
          {
            "name": "setHeight",
            "type": "function",
            "description": "Sets the height of the sidebar.",
            "parameters": [
              {
                "name": "height",
                "type": "string",
                "description": "A CSS-like size specification, such as <code>'100px'</code> or <code>'12ex'</code>."
              }
            ]
          },
          {
            "name": "setExpression",
            "type": "function",
            "description": "Sets an expression that is evaluated within the inspected page. The result is displayed in the sidebar pane.",
            "parameters": [
              {
                "name": "expression",
                "type": "string",
                "description": "An expression to be evaluated in context of the inspected page. JavaScript objects and DOM nodes are displayed in an expandable tree similar to the console/watch."
              },
              {
                "name": "rootTitle",
                "type": "string",
                "optional": true,
                "description": "An optional title for the root of the expression tree."
              },
              {
                "name": "callback",
                "type": "function",
                "optional": true,
                "description": "A callback invoked after the sidebar pane is updated with the expression evaluation results."
              }
            ]
          },
          {
            "name": "setObject",
            "type": "function",
            "description": "Sets a JSON-compliant object to be displayed in the sidebar pane.",
            "parameters": [
              {
                "name": "jsonObject",
                "type": "string",
                "description": "An object to be displayed in context of the inspected page. Evaluated in the context of the caller (API client)."
              },
              {
                "name": "rootTitle",
                "type": "string",
                "optional": true,
                "description": "An optional title for the root of the expression tree."
              },
              {
                "name": "callback",
                "type": "function",
                "optional": true,
                "description": "A callback invoked after the sidebar is updated with the object."
              }
            ]
          },
          {
            "name": "setPage",
            "type": "function",
            "description": "Sets an HTML page to be displayed in the sidebar pane.",
            "parameters": [
              {
                "name": "path",
                "type": "string",
                "description": "Relative path of an extension page to display within the sidebar."
              }
            ]
          }
        ],
        "events": [
          {
            "name": "onShown",
            "type": "function",
            "description": "Fired when the sidebar pane becomes visible as a result of user switching to the panel that hosts it.",
            "parameters": [
              {
                "name": "window",
                "type": "object",
                "isInstanceOf": "global",
                "additionalProperties": {
                  "type": "any"
                },
                "description": "The JavaScript <code>window</code> object of the sidebar page, if one was set with the <code>setPage()</code> method."
              }
            ]
          },
          {
            "name": "onHidden",
            "type": "function",
            "description": "Fired when the sidebar pane becomes hidden as a result of the user switching away from the panel that hosts the sidebar pane."
          }
        ]
      },
      {
        "id": "Button",
        "type": "object",
        "description": "A button created by the extension.",
        "functions": [
          {
            "name": "update",
            "description": "Updates the attributes of the button. If some of the arguments are omitted or <code>null</code>, the corresponding attributes are not updated.",
            "parameters": [
              {
                "name": "iconPath",
                "type": "string",
                "optional": true,
                "description": "Path to the new icon of the button."
              },
              {
                "name": "tooltipText",
                "type": "string",
                "optional": true,
                "description": "Text shown as a tooltip when user hovers the mouse over the button."
              },
              {
                "name": "disabled",
                "type": "boolean",
                "optional": true,
                "description": "Whether the button is disabled."
              }
            ]
          }
        ],
        "events": [
          {
            "name": "onClicked",
            "type": "function",
            "description": "Fired when the button is clicked."
          }
        ]
      }
    ],
    "properties": {
      "elements": {
        "$ref": "ElementsPanel",
        "description": "Elements panel."
      },
      "sources": {
        "$ref": "SourcesPanel",
        "description": "Sources panel."
      }
    },
    "functions": [
      {
        "name": "create",
        "type": "function",
        "description": "Creates an extension panel.",
        "parameters": [
          {
            "name": "title",
            "type": "string",
            "description": "Title that is displayed next to the extension icon in the Developer Tools toolbar."
          },
          {
            "name": "iconPath",
            "type": "string",
            "description": "Path of the panel's icon relative to the extension directory."
          },
          {
            "name": "pagePath",
            "type": "string",
            "description": "Path of the panel's HTML page relative to the extension directory."
          },
          {
            "name": "callback",
            "type": "function",
            "optional": true,
            "description": "A function that is called when the panel is created.",
            "parameters": [
              {
                "name": "panel",
                "description": "An ExtensionPanel object representing the created panel.",
                "$ref": "ExtensionPanel"
              }
            ]
          }
        ]
      },
      {
        "name": "setOpenResourceHandler",
        "type": "function",
        "description": "Specifies the function to be called when the user clicks a resource link in the Developer Tools window. To unset the handler, either call the method with no parameters or pass null as the parameter.",
        "parameters": [
          {
            "name": "callback",
            "type": "function",
            "optional": true,
            "description": "A function that is called when the user clicks on a valid resource link in Developer Tools window. Note that if the user clicks an invalid URL or an XHR, this function is not called.",
            "parameters": [
              {
                "name": "resource",
                "$ref": "devtools.inspectedWindow.Resource",
                "description": "A $(ref:devtools.inspectedWindow.Resource) object for the resource that was clicked."
              }
            ]
          }
        ]
      },
      {
        "name": "openResource",
        "type": "function",
        "description": "Requests DevTools to open a URL in a Developer Tools panel.",
        "parameters": [
          {
            "name": "url",
            "type": "string",
            "description": "The URL of the resource to open."
          },
          {
            "name": "lineNumber",
            "type": "integer",
            "description": "Specifies the line number to scroll to when the resource is loaded."
          },
          {
            "name": "callback",
            "type": "function",
            "optional": true,
            "description": "A function that is called when the resource has been successfully loaded."
          }
        ]
      }
    ],
    "dependencies": [
      "manifest:devtools_page"
    ]
  },
  {
    "types": [
      {
        "id": "HeaderNameValuePair",
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "value": {
            "type": "string"
          }
        }
      },
      {
        "id": "FilenameConflictAction",
        "type": "string",
        "enum": [
          "uniquify",
          "overwrite",
          "prompt"
        ]
      },
      {
        "id": "FilenameSuggestion",
        "type": "object",
        "properties": {
          "filename": {
            "type": "string"
          },
          "conflictAction": {
            "$ref": "FilenameConflictAction",
            "nullable": true
          }
        }
      },
      {
        "id": "HttpMethod",
        "type": "string",
        "enum": [
          "GET",
          "POST"
        ]
      },
      {
        "id": "InterruptReason",
        "type": "string",
        "enum": [
          "FILE_FAILED",
          "FILE_ACCESS_DENIED",
          "FILE_NO_SPACE",
          "FILE_NAME_TOO_LONG",
          "FILE_TOO_LARGE",
          "FILE_VIRUS_INFECTED",
          "FILE_TRANSIENT_ERROR",
          "FILE_BLOCKED",
          "FILE_SECURITY_CHECK_FAILED",
          "FILE_TOO_SHORT",
          "FILE_HASH_MISMATCH",
          "NETWORK_FAILED",
          "NETWORK_TIMEOUT",
          "NETWORK_DISCONNECTED",
          "NETWORK_SERVER_DOWN",
          "NETWORK_INVALID_REQUEST",
          "SERVER_FAILED",
          "SERVER_NO_RANGE",
          "SERVER_BAD_CONTENT",
          "SERVER_UNAUTHORIZED",
          "SERVER_CERT_PROBLEM",
          "SERVER_FORBIDDEN",
          "SERVER_UNREACHABLE",
          "USER_CANCELED",
          "USER_SHUTDOWN",
          "CRASH"
        ]
      },
      {
        "id": "DownloadOptions",
        "type": "object",
        "properties": {
          "url": {
            "type": "string"
          },
          "filename": {
            "type": "string",
            "nullable": true
          },
          "conflictAction": {
            "$ref": "FilenameConflictAction",
            "nullable": true
          },
          "saveAs": {
            "type": "boolean",
            "nullable": true
          },
          "method": {
            "$ref": "HttpMethod",
            "nullable": true
          },
          "headers": {
            "type": "array",
            "items": {
              "$ref": "HeaderNameValuePair"
            },
            "nullable": true
          },
          "body": {
            "type": "string",
            "nullable": true
          }
        }
      },
      {
        "id": "DangerType",
        "type": "string",
        "enum": [
          "file",
          "url",
          "content",
          "uncommon",
          "host",
          "unwanted",
          "safe",
          "accepted"
        ]
      },
      {
        "id": "State",
        "type": "string",
        "enum": [
          "in_progress",
          "interrupted",
          "complete"
        ]
      },
      {
        "id": "DownloadItem",
        "type": "object",
        "properties": {
          "id": {
            "type": "integer"
          },
          "url": {
            "type": "string"
          },
          "finalUrl": {
            "type": "string"
          },
          "referrer": {
            "type": "string"
          },
          "filename": {
            "type": "string"
          },
          "incognito": {
            "type": "boolean"
          },
          "danger": {
            "$ref": "DangerType"
          },
          "mime": {
            "type": "string"
          },
          "startTime": {
            "type": "string"
          },
          "endTime": {
            "type": "string",
            "nullable": true
          },
          "estimatedEndTime": {
            "type": "string",
            "nullable": true
          },
          "state": {
            "$ref": "State"
          },
          "paused": {
            "type": "boolean"
          },
          "canResume": {
            "type": "boolean"
          },
          "error": {
            "$ref": "InterruptReason",
            "nullable": true
          },
          "bytesReceived": {
            "type": "number"
          },
          "totalBytes": {
            "type": "number"
          },
          "fileSize": {
            "type": "number"
          },
          "exists": {
            "type": "boolean"
          },
          "byExtensionId": {
            "type": "string",
            "nullable": true
          },
          "byExtensionName": {
            "type": "string",
            "nullable": true
          }
        }
      },
      {
        "id": "DownloadQuery",
        "type": "object",
        "properties": {
          "query": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "nullable": true
          },
          "startedBefore": {
            "type": "string",
            "nullable": true
          },
          "startedAfter": {
            "type": "string",
            "nullable": true
          },
          "endedBefore": {
            "type": "string",
            "nullable": true
          },
          "endedAfter": {
            "type": "string",
            "nullable": true
          },
          "totalBytesGreater": {
            "type": "number",
            "nullable": true
          },
          "totalBytesLess": {
            "type": "number",
            "nullable": true
          },
          "filenameRegex": {
            "type": "string",
            "nullable": true
          },
          "urlRegex": {
            "type": "string",
            "nullable": true
          },
          "finalUrlRegex": {
            "type": "string",
            "nullable": true
          },
          "limit": {
            "type": "integer",
            "nullable": true
          },
          "orderBy": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "nullable": true
          },
          "id": {
            "type": "integer",
            "nullable": true
          },
          "url": {
            "type": "string",
            "nullable": true
          },
          "finalUrl": {
            "type": "string",
            "nullable": true
          },
          "filename": {
            "type": "string",
            "nullable": true
          },
          "danger": {
            "$ref": "DangerType",
            "nullable": true
          },
          "mime": {
            "type": "string",
            "nullable": true
          },
          "startTime": {
            "type": "string",
            "nullable": true
          },
          "endTime": {
            "type": "string",
            "nullable": true
          },
          "state": {
            "$ref": "State",
            "nullable": true
          },
          "paused": {
            "type": "boolean",
            "nullable": true
          },
          "error": {
            "$ref": "InterruptReason",
            "nullable": true
          },
          "bytesReceived": {
            "type": "number",
            "nullable": true
          },
          "totalBytes": {
            "type": "number",
            "nullable": true
          },
          "fileSize": {
            "type": "number",
            "nullable": true
          },
          "exists": {
            "type": "boolean",
            "nullable": true
          }
        }
      },
      {
        "id": "StringDelta",
        "type": "object",
        "properties": {
          "previous": {
            "type": "string",
            "nullable": true
          },
          "current": {
            "type": "string",
            "nullable": true
          }
        }
      },
      {
        "id": "DoubleDelta",
        "type": "object",
        "properties": {
          "previous": {
            "type": "number",
            "nullable": true
          },
          "current": {
            "type": "number",
            "nullable": true
          }
        }
      },
      {
        "id": "BooleanDelta",
        "type": "object",
        "properties": {
          "previous": {
            "type": "boolean",
            "nullable": true
          },
          "current": {
            "type": "boolean",
            "nullable": true
          }
        }
      },
      {
        "id": "DownloadDelta",
        "type": "object",
        "properties": {
          "id": {
            "type": "integer"
          },
          "url": {
            "$ref": "StringDelta",
            "nullable": true
          },
          "finalUrl": {
            "$ref": "StringDelta",
            "nullable": true
          },
          "filename": {
            "$ref": "StringDelta",
            "nullable": true
          },
          "danger": {
            "$ref": "StringDelta",
            "nullable": true
          },
          "mime": {
            "$ref": "StringDelta",
            "nullable": true
          },
          "startTime": {
            "$ref": "StringDelta",
            "nullable": true
          },
          "endTime": {
            "$ref": "StringDelta",
            "nullable": true
          },
          "state": {
            "$ref": "StringDelta",
            "nullable": true
          },
          "canResume": {
            "$ref": "BooleanDelta",
            "nullable": true
          },
          "paused": {
            "$ref": "BooleanDelta",
            "nullable": true
          },
          "error": {
            "$ref": "StringDelta",
            "nullable": true
          },
          "totalBytes": {
            "$ref": "DoubleDelta",
            "nullable": true
          },
          "fileSize": {
            "$ref": "DoubleDelta",
            "nullable": true
          },
          "exists": {
            "$ref": "BooleanDelta",
            "nullable": true
          }
        }
      },
      {
        "id": "GetFileIconOptions",
        "type": "object",
        "properties": {
          "size": {
            "type": "integer",
            "nullable": true
          }
        }
      }
    ],
    "functions": [
      {
        "name": "download",
        "type": "function",
        "parameters": [
          {
            "$ref": "DownloadOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": true,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "type": "integer",
                "optional": false,
                "name": "downloadId"
              }
            ]
          }
        ],
        "static": true
      },
      {
        "name": "search",
        "type": "function",
        "parameters": [
          {
            "$ref": "DownloadQuery",
            "optional": false,
            "name": "query"
          },
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "type": "array",
                "items": {
                  "$ref": "DownloadItem"
                },
                "optional": false,
                "name": "results"
              }
            ]
          }
        ],
        "static": true
      },
      {
        "name": "pause",
        "type": "function",
        "parameters": [
          {
            "type": "integer",
            "optional": false,
            "name": "downloadId"
          },
          {
            "optional": true,
            "name": "callback",
            "type": "function",
            "parameters": []
          }
        ],
        "static": true
      },
      {
        "name": "resume",
        "type": "function",
        "parameters": [
          {
            "type": "integer",
            "optional": false,
            "name": "downloadId"
          },
          {
            "optional": true,
            "name": "callback",
            "type": "function",
            "parameters": []
          }
        ],
        "static": true
      },
      {
        "name": "cancel",
        "type": "function",
        "parameters": [
          {
            "type": "integer",
            "optional": false,
            "name": "downloadId"
          },
          {
            "optional": true,
            "name": "callback",
            "type": "function",
            "parameters": []
          }
        ],
        "static": true
      },
      {
        "name": "getFileIcon",
        "type": "function",
        "parameters": [
          {
            "type": "integer",
            "optional": false,
            "name": "downloadId"
          },
          {
            "$ref": "GetFileIconOptions",
            "optional": true,
            "name": "options"
          },
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "type": "string",
                "optional": true,
                "name": "iconURL"
              }
            ]
          }
        ],
        "static": true
      },
      {
        "name": "open",
        "type": "function",
        "parameters": [
          {
            "type": "integer",
            "optional": false,
            "name": "downloadId"
          }
        ],
        "static": true
      },
      {
        "name": "show",
        "type": "function",
        "parameters": [
          {
            "type": "integer",
            "optional": false,
            "name": "downloadId"
          }
        ],
        "static": true
      },
      {
        "name": "showDefaultFolder",
        "type": "function",
        "static": true
      },
      {
        "name": "erase",
        "type": "function",
        "parameters": [
          {
            "$ref": "DownloadQuery",
            "optional": false,
            "name": "query"
          },
          {
            "optional": true,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "type": "array",
                "items": {
                  "type": "integer"
                },
                "optional": false,
                "name": "erasedIds"
              }
            ]
          }
        ],
        "static": true
      },
      {
        "name": "removeFile",
        "type": "function",
        "parameters": [
          {
            "type": "integer",
            "optional": false,
            "name": "downloadId"
          },
          {
            "optional": true,
            "name": "callback",
            "type": "function",
            "parameters": []
          }
        ],
        "static": true
      },
      {
        "name": "acceptDanger",
        "type": "function",
        "parameters": [
          {
            "type": "integer",
            "optional": false,
            "name": "downloadId"
          },
          {
            "optional": true,
            "name": "callback",
            "type": "function",
            "parameters": []
          }
        ],
        "static": true
      },
      {
        "name": "drag",
        "type": "function",
        "parameters": [
          {
            "type": "integer",
            "optional": false,
            "name": "downloadId"
          }
        ],
        "static": true
      },
      {
        "name": "setShelfEnabled",
        "type": "function",
        "parameters": [
          {
            "type": "boolean",
            "optional": false,
            "name": "enabled"
          }
        ],
        "static": true
      }
    ],
    "events": [
      {
        "name": "onCreated",
        "type": "function",
        "parameters": [
          {
            "$ref": "DownloadItem",
            "optional": false,
            "name": "downloadItem"
          }
        ]
      },
      {
        "name": "onErased",
        "type": "function",
        "parameters": [
          {
            "type": "integer",
            "optional": false,
            "name": "downloadId"
          }
        ]
      },
      {
        "name": "onChanged",
        "type": "function",
        "parameters": [
          {
            "$ref": "DownloadDelta",
            "optional": false,
            "name": "downloadDelta"
          }
        ]
      },
      {
        "name": "onDeterminingFilename",
        "type": "function",
        "parameters": [
          {
            "$ref": "DownloadItem",
            "optional": false,
            "name": "downloadItem"
          },
          {
            "optional": false,
            "name": "suggest",
            "type": "function",
            "parameters": [
              {
                "$ref": "FilenameSuggestion",
                "optional": true,
                "name": "suggestion"
              }
            ]
          }
        ]
      }
    ],
    "namespace": "downloads",
    "dependencies": [
      "permission:downloads"
    ]
  },
  {
    "namespace": "events",
    "description": "The <code>chrome.events</code> namespace contains common types used by APIs dispatching events to notify you when something interesting happens.",
    "compiler_options": {
      "implemented_in": "extensions/browser/api/declarative/declarative_api.h"
    },
    "types": [
      {
        "id": "Rule",
        "type": "object",
        "description": "Description of a declarative rule for handling events.",
        "properties": {
          "id": {
            "type": "string",
            "optional": true,
            "description": "Optional identifier that allows referencing this rule."
          },
          "tags": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "optional": true,
            "description": "Tags can be used to annotate rules and perform operations on sets of rules."
          },
          "conditions": {
            "type": "array",
            "items": {
              "type": "any"
            },
            "description": "List of conditions that can trigger the actions."
          },
          "actions": {
            "type": "array",
            "items": {
              "type": "any"
            },
            "description": "List of actions that are triggered if one of the condtions is fulfilled."
          },
          "priority": {
            "type": "integer",
            "optional": true,
            "description": "Optional priority of this rule. Defaults to 100."
          }
        }
      },
      {
        "id": "Event",
        "type": "object",
        "description": "An object which allows the addition and removal of listeners for a Chrome event.",
        "additionalProperties": {
          "type": "any"
        },
        "functions": [
          {
            "name": "addListener",
            "nocompile": true,
            "type": "function",
            "description": "Registers an event listener <em>callback</em> to an event.",
            "parameters": [
              {
                "name": "callback",
                "type": "function",
                "description": "Called when an event occurs. The parameters of this function depend on the type of event."
              }
            ]
          },
          {
            "name": "removeListener",
            "nocompile": true,
            "type": "function",
            "description": "Deregisters an event listener <em>callback</em> from an event.",
            "parameters": [
              {
                "name": "callback",
                "type": "function",
                "description": "Listener that shall be unregistered."
              }
            ]
          },
          {
            "name": "hasListener",
            "nocompile": true,
            "type": "function",
            "parameters": [
              {
                "name": "callback",
                "type": "function",
                "description": "Listener whose registration status shall be tested."
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "True if <em>callback</em> is registered to the event."
            }
          },
          {
            "name": "hasListeners",
            "nocompile": true,
            "type": "function",
            "parameters": [],
            "returns": {
              "type": "boolean",
              "description": "True if any event listeners are registered to the event."
            }
          },
          {
            "name": "addRules",
            "type": "function",
            "description": "Registers rules to handle events.",
            "parameters": [
              {
                "nodoc": "true",
                "name": "eventName",
                "type": "string",
                "description": "Name of the event this function affects."
              },
              {
                "name": "webViewInstanceId",
                "type": "integer",
                "nodoc": true,
                "description": "If provided, this is an integer that uniquely identfies the <webview> associated with this function call."
              },
              {
                "name": "rules",
                "type": "array",
                "items": {
                  "$ref": "Rule"
                },
                "description": "Rules to be registered. These do not replace previously registered rules."
              },
              {
                "name": "callback",
                "optional": true,
                "type": "function",
                "parameters": [
                  {
                    "name": "rules",
                    "type": "array",
                    "items": {
                      "$ref": "Rule"
                    },
                    "description": "Rules that were registered, the optional parameters are filled with values."
                  }
                ],
                "description": "Called with registered rules."
              }
            ]
          },
          {
            "name": "getRules",
            "type": "function",
            "description": "Returns currently registered rules.",
            "parameters": [
              {
                "nodoc": "true",
                "name": "eventName",
                "type": "string",
                "description": "Name of the event this function affects."
              },
              {
                "name": "webViewInstanceId",
                "type": "integer",
                "nodoc": true,
                "description": "If provided, this is an integer that uniquely identfies the <webview> associated with this function call."
              },
              {
                "name": "ruleIdentifiers",
                "optional": true,
                "type": "array",
                "items": {
                  "type": "string"
                },
                "description": "If an array is passed, only rules with identifiers contained in this array are returned."
              },
              {
                "name": "callback",
                "type": "function",
                "parameters": [
                  {
                    "name": "rules",
                    "type": "array",
                    "items": {
                      "$ref": "Rule"
                    },
                    "description": "Rules that were registered, the optional parameters are filled with values."
                  }
                ],
                "description": "Called with registered rules."
              }
            ]
          },
          {
            "name": "removeRules",
            "type": "function",
            "description": "Unregisters currently registered rules.",
            "parameters": [
              {
                "nodoc": "true",
                "name": "eventName",
                "type": "string",
                "description": "Name of the event this function affects."
              },
              {
                "name": "webViewInstanceId",
                "type": "integer",
                "nodoc": true,
                "description": "If provided, this is an integer that uniquely identfies the <webview> associated with this function call."
              },
              {
                "name": "ruleIdentifiers",
                "optional": true,
                "type": "array",
                "items": {
                  "type": "string"
                },
                "description": "If an array is passed, only rules with identifiers contained in this array are unregistered."
              },
              {
                "name": "callback",
                "optional": true,
                "type": "function",
                "parameters": [],
                "description": "Called when rules were unregistered."
              }
            ]
          }
        ]
      },
      {
        "id": "UrlFilter",
        "type": "object",
        "description": "Filters URLs for various criteria. See <a href='events#filtered'>event filtering</a>. All criteria are case sensitive.",
        "nocompile": true,
        "properties": {
          "hostContains": {
            "type": "string",
            "description": "Matches if the host name of the URL contains a specified string. To test whether a host name component has a prefix 'foo', use hostContains: '.foo'. This matches 'www.foobar.com' and 'foo.com', because an implicit dot is added at the beginning of the host name. Similarly, hostContains can be used to match against component suffix ('foo.') and to exactly match against components ('.foo.'). Suffix- and exact-matching for the last components need to be done separately using hostSuffix, because no implicit dot is added at the end of the host name.",
            "optional": true
          },
          "hostEquals": {
            "type": "string",
            "description": "Matches if the host name of the URL is equal to a specified string.",
            "optional": true
          },
          "hostPrefix": {
            "type": "string",
            "description": "Matches if the host name of the URL starts with a specified string.",
            "optional": true
          },
          "hostSuffix": {
            "type": "string",
            "description": "Matches if the host name of the URL ends with a specified string.",
            "optional": true
          },
          "pathContains": {
            "type": "string",
            "description": "Matches if the path segment of the URL contains a specified string.",
            "optional": true
          },
          "pathEquals": {
            "type": "string",
            "description": "Matches if the path segment of the URL is equal to a specified string.",
            "optional": true
          },
          "pathPrefix": {
            "type": "string",
            "description": "Matches if the path segment of the URL starts with a specified string.",
            "optional": true
          },
          "pathSuffix": {
            "type": "string",
            "description": "Matches if the path segment of the URL ends with a specified string.",
            "optional": true
          },
          "queryContains": {
            "type": "string",
            "description": "Matches if the query segment of the URL contains a specified string.",
            "optional": true
          },
          "queryEquals": {
            "type": "string",
            "description": "Matches if the query segment of the URL is equal to a specified string.",
            "optional": true
          },
          "queryPrefix": {
            "type": "string",
            "description": "Matches if the query segment of the URL starts with a specified string.",
            "optional": true
          },
          "querySuffix": {
            "type": "string",
            "description": "Matches if the query segment of the URL ends with a specified string.",
            "optional": true
          },
          "urlContains": {
            "type": "string",
            "description": "Matches if the URL (without fragment identifier) contains a specified string. Port numbers are stripped from the URL if they match the default port number.",
            "optional": true
          },
          "urlEquals": {
            "type": "string",
            "description": "Matches if the URL (without fragment identifier) is equal to a specified string. Port numbers are stripped from the URL if they match the default port number.",
            "optional": true
          },
          "urlMatches": {
            "type": "string",
            "description": "Matches if the URL (without fragment identifier) matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the <a href=\"https://github.com/google/re2/blob/master/doc/syntax.txt\">RE2 syntax</a>.",
            "optional": true
          },
          "originAndPathMatches": {
            "type": "string",
            "description": "Matches if the URL without query segment and fragment identifier matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the <a href=\"https://github.com/google/re2/blob/master/doc/syntax.txt\">RE2 syntax</a>.",
            "optional": true
          },
          "urlPrefix": {
            "type": "string",
            "description": "Matches if the URL (without fragment identifier) starts with a specified string. Port numbers are stripped from the URL if they match the default port number.",
            "optional": true
          },
          "urlSuffix": {
            "type": "string",
            "description": "Matches if the URL (without fragment identifier) ends with a specified string. Port numbers are stripped from the URL if they match the default port number.",
            "optional": true
          },
          "schemes": {
            "type": "array",
            "description": "Matches if the scheme of the URL is equal to any of the schemes specified in the array.",
            "optional": true,
            "items": {
              "type": "string"
            }
          },
          "ports": {
            "type": "array",
            "description": "Matches if the port of the URL is contained in any of the specified port lists. For example <code>[80, 443, [1000, 1200]]</code> matches all requests on port 80, 443 and in the range 1000-1200.",
            "optional": true,
            "items": {
              "choices": [
                {
                  "type": "integer",
                  "description": "A specific port."
                },
                {
                  "type": "array",
                  "items": {
                    "type": "integer"
                  },
                  "description": "A pair of integers identiying the start and end (both inclusive) of a port range."
                }
              ]
            }
          }
        }
      }
    ]
  },
  {
    "namespace": "extension",
    "description": "The <code>chrome.extension</code> API has utilities that can be used by any extension page. It includes support for exchanging messages between an extension and its content scripts or between extensions, as described in detail in <a href='messaging'>Message Passing</a>.",
    "compiler_options": {
      "implemented_in": "chrome/browser/extensions/api/module/module.h"
    },
    "properties": {
      "lastError": {
        "type": "object",
        "optional": true,
        "description": "Set for the lifetime of a callback if an ansychronous extension api has resulted in an error. If no error has occured lastError will be <var>undefined</var>.",
        "properties": {
          "message": {
            "type": "string",
            "description": "Description of the error that has taken place."
          }
        }
      },
      "inIncognitoContext": {
        "type": "boolean",
        "optional": true,
        "description": "True for content scripts running inside incognito tabs, and for extension pages running inside an incognito process. The latter only applies to extensions with 'split' incognito_behavior."
      }
    },
    "types": [
      {
        "id": "ViewType",
        "type": "string",
        "enum": [
          "tab",
          "popup"
        ],
        "description": "The type of extension view."
      }
    ],
    "functions": [
      {
        "name": "sendRequest",
        "nocompile": true,
        "deprecated": "Please use $(ref:runtime.sendMessage).",
        "type": "function",
        "allowAmbiguousOptionalArguments": true,
        "description": "Sends a single request to other listeners within the extension. Similar to $(ref:runtime.connect), but only sends a single request with an optional response. The $(ref:extension.onRequest) event is fired in each page of the extension.",
        "parameters": [
          {
            "type": "string",
            "name": "extensionId",
            "optional": true,
            "description": "The extension ID of the extension you want to connect to. If omitted, default is your own extension."
          },
          {
            "type": "any",
            "name": "request"
          },
          {
            "type": "function",
            "name": "responseCallback",
            "optional": true,
            "parameters": [
              {
                "name": "response",
                "type": "any",
                "description": "The JSON response object sent by the handler of the request. If an error occurs while connecting to the extension, the callback will be called with no arguments and $(ref:runtime.lastError) will be set to the error message."
              }
            ]
          }
        ],
        "content_script": true
      },
      {
        "name": "getURL",
        "nocompile": true,
        "type": "function",
        "description": "Converts a relative path within an extension install directory to a fully-qualified URL.",
        "parameters": [
          {
            "type": "string",
            "name": "path",
            "description": "A path to a resource within an extension expressed relative to its install directory."
          }
        ],
        "returns": {
          "type": "string",
          "description": "The fully-qualified URL to the resource."
        },
        "content_script": true
      },
      {
        "name": "getViews",
        "nocompile": true,
        "type": "function",
        "description": "Returns an array of the JavaScript 'window' objects for each of the pages running inside the current extension.",
        "parameters": [
          {
            "type": "object",
            "name": "fetchProperties",
            "optional": true,
            "properties": {
              "type": {
                "$ref": "ViewType",
                "optional": true,
                "description": "The type of view to get. If omitted, returns all views (including background pages and tabs). Valid values: 'tab', 'notification', 'popup'."
              },
              "windowId": {
                "type": "integer",
                "optional": true,
                "description": "The window to restrict the search to. If omitted, returns all views."
              },
              "tabId": {
                "type": "integer",
                "optional": true,
                "description": "Find a view according to a tab id. If this field is omitted, returns all views."
              }
            }
          }
        ],
        "returns": {
          "type": "array",
          "description": "Array of global objects",
          "items": {
            "name": "viewGlobals",
            "type": "object",
            "isInstanceOf": "Window",
            "additionalProperties": {
              "type": "any"
            }
          }
        }
      },
      {
        "name": "getBackgroundPage",
        "nocompile": true,
        "type": "function",
        "description": "Returns the JavaScript 'window' object for the background page running inside the current extension. Returns null if the extension has no background page.",
        "parameters": [],
        "returns": {
          "type": "object",
          "optional": true,
          "name": "backgroundPageGlobal",
          "isInstanceOf": "Window",
          "additionalProperties": {
            "type": "any"
          }
        }
      },
      {
        "name": "getExtensionTabs",
        "nocompile": true,
        "deprecated": "Please use $(ref:extension.getViews) <code>{type: \"tab\"}</code>.",
        "type": "function",
        "maximumManifestVersion": 1,
        "description": "Returns an array of the JavaScript 'window' objects for each of the tabs running inside the current extension. If <code>windowId</code> is specified, returns only the 'window' objects of tabs attached to the specified window.",
        "parameters": [
          {
            "type": "integer",
            "name": "windowId",
            "optional": true
          }
        ],
        "returns": {
          "type": "array",
          "description": "Array of global window objects",
          "items": {
            "type": "object",
            "name": "tabGlobals",
            "isInstanceOf": "Window",
            "additionalProperties": {
              "type": "any"
            }
          }
        }
      },
      {
        "name": "isAllowedIncognitoAccess",
        "type": "function",
        "description": "Retrieves the state of the extension's access to Incognito-mode (as determined by the user-controlled 'Allowed in Incognito' checkbox.",
        "min_version": "12.0.706.0",
        "parameters": [
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "isAllowedAccess",
                "type": "boolean",
                "description": "True if the extension has access to Incognito mode, false otherwise."
              }
            ]
          }
        ]
      },
      {
        "name": "isAllowedFileSchemeAccess",
        "type": "function",
        "description": "Retrieves the state of the extension's access to the 'file://' scheme (as determined by the user-controlled 'Allow access to File URLs' checkbox.",
        "min_version": "12.0.706.0",
        "parameters": [
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "isAllowedAccess",
                "type": "boolean",
                "description": "True if the extension can access the 'file://' scheme, false otherwise."
              }
            ]
          }
        ]
      },
      {
        "name": "setUpdateUrlData",
        "type": "function",
        "description": "Sets the value of the ap CGI parameter used in the extension's update URL.  This value is ignored for extensions that are hosted in the Chrome Extension Gallery.",
        "parameters": [
          {
            "type": "string",
            "name": "data",
            "maxLength": 1024
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onRequest",
        "deprecated": "Please use $(ref:runtime.onMessage).",
        "type": "function",
        "options": {
          "unmanaged": true
        },
        "description": "Fired when a request is sent from either an extension process or a content script.",
        "parameters": [
          {
            "name": "request",
            "type": "any",
            "optional": true,
            "description": "The request sent by the calling script."
          },
          {
            "name": "sender",
            "$ref": "runtime.MessageSender"
          },
          {
            "name": "sendResponse",
            "type": "function",
            "description": "Function to call (at most once) when you have a response. The argument should be any JSON-ifiable object, or undefined if there is no response. If you have more than one <code>onRequest</code> listener in the same document, then only one may send a response."
          }
        ]
      },
      {
        "name": "onRequestExternal",
        "deprecated": "Please use $(ref:runtime.onMessageExternal).",
        "type": "function",
        "description": "Fired when a request is sent from another extension.",
        "parameters": [
          {
            "name": "request",
            "type": "any",
            "optional": true,
            "description": "The request sent by the calling script."
          },
          {
            "name": "sender",
            "$ref": "runtime.MessageSender"
          },
          {
            "name": "sendResponse",
            "type": "function",
            "description": "Function to call when you have a response. The argument should be any JSON-ifiable object, or undefined if there is no response."
          }
        ]
      }
    ]
  },
  {
    "namespace": "extensionTypes",
    "description": "The <code>chrome.extensionTypes</code> API contains type declarations for Chrome extensions.",
    "types": [
      {
        "id": "ImageFormat",
        "type": "string",
        "enum": [
          "jpeg",
          "png"
        ],
        "description": "The format of an image."
      },
      {
        "id": "ImageDetails",
        "type": "object",
        "description": "Details about the format and quality of an image.",
        "properties": {
          "format": {
            "$ref": "ImageFormat",
            "optional": true,
            "description": "The format of the resulting image.  Default is <code>\"jpeg\"</code>."
          },
          "quality": {
            "type": "integer",
            "optional": true,
            "minimum": 0,
            "maximum": 100,
            "description": "When format is <code>\"jpeg\"</code>, controls the quality of the resulting image.  This value is ignored for PNG images.  As quality is decreased, the resulting image will have more visual artifacts, and the number of bytes needed to store it will decrease."
          }
        }
      },
      {
        "id": "RunAt",
        "type": "string",
        "enum": [
          "document_start",
          "document_end",
          "document_idle"
        ],
        "description": "The soonest that the JavaScript or CSS will be injected into the tab."
      },
      {
        "id": "InjectDetails",
        "type": "object",
        "description": "Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time.",
        "properties": {
          "code": {
            "type": "string",
            "optional": true,
            "description": "JavaScript or CSS code to inject.<br><br><b>Warning:</b><br>Be careful using the <code>code</code> parameter. Incorrect use of it may open your extension to <a href=\"https://en.wikipedia.org/wiki/Cross-site_scripting\">cross site scripting</a> attacks."
          },
          "file": {
            "type": "string",
            "optional": true,
            "description": "JavaScript or CSS file to inject."
          },
          "allFrames": {
            "type": "boolean",
            "optional": true,
            "description": "If allFrames is <code>true</code>, implies that the JavaScript or CSS should be injected into all frames of current page. By default, it's <code>false</code> and is only injected into the top frame. If <code>true</code> and <code>frameId</code> is set, then the code is inserted in the selected frame and all of its child frames."
          },
          "frameId": {
            "type": "integer",
            "optional": true,
            "minimum": 0,
            "description": "The <a href='webNavigation#frame_ids'>frame</a> where the script or CSS should be injected. Defaults to 0 (the top-level frame)."
          },
          "matchAboutBlank": {
            "type": "boolean",
            "optional": true,
            "description": "If matchAboutBlank is true, then the code is also injected in about:blank and about:srcdoc frames if your extension has access to its parent document. Code cannot be inserted in top-level about:-frames. By default it is <code>false</code>."
          },
          "runAt": {
            "$ref": "RunAt",
            "optional": true,
            "description": "The soonest that the JavaScript or CSS will be injected into the tab. Defaults to \"document_idle\"."
          }
        }
      }
    ]
  },
  {
    "namespace": "fontSettings",
    "description": "Use the <code>chrome.fontSettings</code> API to manage Chrome's font settings.",
    "types": [
      {
        "id": "FontName",
        "type": "object",
        "description": "Represents a font name.",
        "properties": {
          "fontId": {
            "type": "string",
            "description": "The font ID."
          },
          "displayName": {
            "type": "string",
            "description": "The display name of the font."
          }
        }
      },
      {
        "id": "ScriptCode",
        "type": "string",
        "enum": [
          "Afak",
          "Arab",
          "Armi",
          "Armn",
          "Avst",
          "Bali",
          "Bamu",
          "Bass",
          "Batk",
          "Beng",
          "Blis",
          "Bopo",
          "Brah",
          "Brai",
          "Bugi",
          "Buhd",
          "Cakm",
          "Cans",
          "Cari",
          "Cham",
          "Cher",
          "Cirt",
          "Copt",
          "Cprt",
          "Cyrl",
          "Cyrs",
          "Deva",
          "Dsrt",
          "Dupl",
          "Egyd",
          "Egyh",
          "Egyp",
          "Elba",
          "Ethi",
          "Geor",
          "Geok",
          "Glag",
          "Goth",
          "Gran",
          "Grek",
          "Gujr",
          "Guru",
          "Hang",
          "Hani",
          "Hano",
          "Hans",
          "Hant",
          "Hebr",
          "Hluw",
          "Hmng",
          "Hung",
          "Inds",
          "Ital",
          "Java",
          "Jpan",
          "Jurc",
          "Kali",
          "Khar",
          "Khmr",
          "Khoj",
          "Knda",
          "Kpel",
          "Kthi",
          "Lana",
          "Laoo",
          "Latf",
          "Latg",
          "Latn",
          "Lepc",
          "Limb",
          "Lina",
          "Linb",
          "Lisu",
          "Loma",
          "Lyci",
          "Lydi",
          "Mand",
          "Mani",
          "Maya",
          "Mend",
          "Merc",
          "Mero",
          "Mlym",
          "Moon",
          "Mong",
          "Mroo",
          "Mtei",
          "Mymr",
          "Narb",
          "Nbat",
          "Nkgb",
          "Nkoo",
          "Nshu",
          "Ogam",
          "Olck",
          "Orkh",
          "Orya",
          "Osma",
          "Palm",
          "Perm",
          "Phag",
          "Phli",
          "Phlp",
          "Phlv",
          "Phnx",
          "Plrd",
          "Prti",
          "Rjng",
          "Roro",
          "Runr",
          "Samr",
          "Sara",
          "Sarb",
          "Saur",
          "Sgnw",
          "Shaw",
          "Shrd",
          "Sind",
          "Sinh",
          "Sora",
          "Sund",
          "Sylo",
          "Syrc",
          "Syre",
          "Syrj",
          "Syrn",
          "Tagb",
          "Takr",
          "Tale",
          "Talu",
          "Taml",
          "Tang",
          "Tavt",
          "Telu",
          "Teng",
          "Tfng",
          "Tglg",
          "Thaa",
          "Thai",
          "Tibt",
          "Tirh",
          "Ugar",
          "Vaii",
          "Visp",
          "Wara",
          "Wole",
          "Xpeo",
          "Xsux",
          "Yiii",
          "Zmth",
          "Zsym",
          "Zyyy"
        ],
        "description": "An ISO 15924 script code. The default, or global, script is represented by script code \"Zyyy\"."
      },
      {
        "id": "GenericFamily",
        "type": "string",
        "enum": [
          "standard",
          "sansserif",
          "serif",
          "fixed",
          "cursive",
          "fantasy"
        ],
        "description": "A CSS generic font family."
      },
      {
        "id": "LevelOfControl",
        "description": "One of<br><var>not_controllable</var>: cannot be controlled by any extension<br><var>controlled_by_other_extensions</var>: controlled by extensions with higher precedence<br><var>controllable_by_this_extension</var>: can be controlled by this extension<br><var>controlled_by_this_extension</var>: controlled by this extension",
        "type": "string",
        "enum": [
          "not_controllable",
          "controlled_by_other_extensions",
          "controllable_by_this_extension",
          "controlled_by_this_extension"
        ]
      }
    ],
    "functions": [
      {
        "name": "clearFont",
        "description": "Clears the font set by this extension, if any.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "properties": {
              "script": {
                "$ref": "ScriptCode",
                "description": "The script for which the font should be cleared. If omitted, the global script font setting is cleared.",
                "optional": true
              },
              "genericFamily": {
                "$ref": "GenericFamily",
                "description": "The generic font family for which the font should be cleared."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "getFont",
        "description": "Gets the font for a given script and generic font family.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "properties": {
              "script": {
                "$ref": "ScriptCode",
                "description": "The script for which the font should be retrieved. If omitted, the font setting for the global script (script code \"Zyyy\") is retrieved.",
                "optional": true
              },
              "genericFamily": {
                "$ref": "GenericFamily",
                "description": "The generic font family for which the font should be retrieved."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": [
              {
                "name": "details",
                "type": "object",
                "properties": {
                  "fontId": {
                    "type": "string",
                    "description": "The font ID. Rather than the literal font ID preference value, this may be the ID of the font that the system resolves the preference value to. So, <var>fontId</var> can differ from the font passed to <code>setFont</code>, if, for example, the font is not available on the system. The empty string signifies fallback to the global script font setting."
                  },
                  "levelOfControl": {
                    "$ref": "LevelOfControl",
                    "description": "The level of control this extension has over the setting."
                  }
                }
              }
            ]
          }
        ]
      },
      {
        "name": "setFont",
        "description": "Sets the font for a given script and generic font family.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "properties": {
              "script": {
                "$ref": "ScriptCode",
                "description": "The script code which the font should be set. If omitted, the font setting for the global script (script code \"Zyyy\") is set.",
                "optional": true
              },
              "genericFamily": {
                "$ref": "GenericFamily",
                "description": "The generic font family for which the font should be set."
              },
              "fontId": {
                "type": "string",
                "description": "The font ID. The empty string means to fallback to the global script font setting."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "getFontList",
        "description": "Gets a list of fonts on the system.",
        "parameters": [
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "results",
                "type": "array",
                "items": {
                  "$ref": "FontName"
                }
              }
            ]
          }
        ]
      },
      {
        "name": "clearDefaultFontSize",
        "description": "Clears the default font size set by this extension, if any.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "optional": true,
            "description": "This parameter is currently unused.",
            "properties": {}
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "getDefaultFontSize",
        "description": "Gets the default font size.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "optional": true,
            "description": "This parameter is currently unused.",
            "properties": {}
          },
          {
            "name": "callback",
            "type": "function",
            "optional": true,
            "parameters": [
              {
                "name": "details",
                "type": "object",
                "properties": {
                  "pixelSize": {
                    "type": "integer",
                    "description": "The font size in pixels."
                  },
                  "levelOfControl": {
                    "$ref": "LevelOfControl",
                    "description": "The level of control this extension has over the setting."
                  }
                }
              }
            ]
          }
        ]
      },
      {
        "name": "setDefaultFontSize",
        "description": "Sets the default font size.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "properties": {
              "pixelSize": {
                "type": "integer",
                "description": "The font size in pixels."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "clearDefaultFixedFontSize",
        "description": "Clears the default fixed font size set by this extension, if any.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "optional": true,
            "description": "This parameter is currently unused.",
            "properties": {}
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "getDefaultFixedFontSize",
        "description": "Gets the default size for fixed width fonts.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "optional": true,
            "description": "This parameter is currently unused.",
            "properties": {}
          },
          {
            "name": "callback",
            "type": "function",
            "optional": true,
            "parameters": [
              {
                "name": "details",
                "type": "object",
                "properties": {
                  "pixelSize": {
                    "type": "integer",
                    "description": "The font size in pixels."
                  },
                  "levelOfControl": {
                    "$ref": "LevelOfControl",
                    "description": "The level of control this extension has over the setting."
                  }
                }
              }
            ]
          }
        ]
      },
      {
        "name": "setDefaultFixedFontSize",
        "description": "Sets the default size for fixed width fonts.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "properties": {
              "pixelSize": {
                "type": "integer",
                "description": "The font size in pixels."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "clearMinimumFontSize",
        "description": "Clears the minimum font size set by this extension, if any.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "optional": true,
            "description": "This parameter is currently unused.",
            "properties": {}
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "getMinimumFontSize",
        "description": "Gets the minimum font size.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "optional": true,
            "description": "This parameter is currently unused.",
            "properties": {}
          },
          {
            "name": "callback",
            "type": "function",
            "optional": true,
            "parameters": [
              {
                "name": "details",
                "type": "object",
                "properties": {
                  "pixelSize": {
                    "type": "integer",
                    "description": "The font size in pixels."
                  },
                  "levelOfControl": {
                    "$ref": "LevelOfControl",
                    "description": "The level of control this extension has over the setting."
                  }
                }
              }
            ]
          }
        ]
      },
      {
        "name": "setMinimumFontSize",
        "description": "Sets the minimum font size.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "properties": {
              "pixelSize": {
                "type": "integer",
                "description": "The font size in pixels."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": []
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onFontChanged",
        "description": "Fired when a font setting changes.",
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "properties": {
              "fontId": {
                "type": "string",
                "description": "The font ID. See the description in <code>getFont</code>."
              },
              "script": {
                "$ref": "ScriptCode",
                "description": "The script code for which the font setting has changed.",
                "optional": true
              },
              "genericFamily": {
                "$ref": "GenericFamily",
                "description": "The generic font family for which the font setting has changed."
              },
              "levelOfControl": {
                "$ref": "LevelOfControl",
                "description": "The level of control this extension has over the setting."
              }
            }
          }
        ]
      },
      {
        "name": "onDefaultFontSizeChanged",
        "description": "Fired when the default font size setting changes.",
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "properties": {
              "pixelSize": {
                "type": "integer",
                "description": "The font size in pixels."
              },
              "levelOfControl": {
                "$ref": "LevelOfControl",
                "description": "The level of control this extension has over the setting."
              }
            }
          }
        ]
      },
      {
        "name": "onDefaultFixedFontSizeChanged",
        "description": "Fired when the default fixed font size setting changes.",
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "properties": {
              "pixelSize": {
                "type": "integer",
                "description": "The font size in pixels."
              },
              "levelOfControl": {
                "$ref": "LevelOfControl",
                "description": "The level of control this extension has over the setting."
              }
            }
          }
        ]
      },
      {
        "name": "onMinimumFontSizeChanged",
        "description": "Fired when the minimum font size setting changes.",
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "properties": {
              "pixelSize": {
                "type": "integer",
                "description": "The font size in pixels."
              },
              "levelOfControl": {
                "$ref": "LevelOfControl",
                "description": "The level of control this extension has over the setting."
              }
            }
          }
        ]
      }
    ],
    "dependencies": [
      "permission:fontSettings"
    ]
  },
  {
    "namespace": "gcm",
    "description": "Use <code>chrome.gcm</code> to enable apps and extensions to send and receive messages through the <a href='http://developer.android.com/google/gcm/'>Google Cloud Messaging Service</a>.",
    "properties": {
      "MAX_MESSAGE_SIZE": {
        "value": 4096,
        "description": "The maximum size (in bytes) of all key/value pairs in a message."
      }
    },
    "functions": [
      {
        "name": "register",
        "type": "function",
        "description": "Registers the application with GCM. The registration ID will be returned by the <code>callback</code>. If <code>register</code> is called again with the same list of <code>senderIds</code>, the same registration ID will be returned.",
        "parameters": [
          {
            "name": "senderIds",
            "type": "array",
            "items": {
              "type": "string",
              "minLength": 1
            },
            "minItems": 1,
            "maxItems": 100,
            "description": "A list of server IDs that are allowed to send messages to the application. It should contain at least one and no more than 100 sender IDs."
          },
          {
            "name": "callback",
            "type": "function",
            "description": "Function called when registration completes. It should check $(ref:runtime.lastError) for error when <code>registrationId</code> is empty.",
            "parameters": [
              {
                "name": "registrationId",
                "type": "string",
                "description": "A registration ID assigned to the application by the GCM."
              }
            ]
          }
        ]
      },
      {
        "name": "unregister",
        "type": "function",
        "description": "Unregisters the application from GCM.",
        "parameters": [
          {
            "name": "callback",
            "type": "function",
            "description": "A function called after the unregistration completes. Unregistration was successful if $(ref:runtime.lastError) is not set.",
            "parameters": []
          }
        ]
      },
      {
        "name": "send",
        "type": "function",
        "description": "Sends a message according to its contents.",
        "parameters": [
          {
            "name": "message",
            "type": "object",
            "description": "A message to send to the other party via GCM.",
            "properties": {
              "destinationId": {
                "type": "string",
                "minLength": 1,
                "description": "The ID of the server to send the message to as assigned by <a href='https://code.google.com/apis/console'>Google API Console</a>."
              },
              "messageId": {
                "type": "string",
                "minLength": 1,
                "description": "The ID of the message. It must be unique for each message in scope of the applications. See the <a href='cloudMessaging#send_messages'>Cloud Messaging documentation</a> for advice for picking and handling an ID."
              },
              "timeToLive": {
                "type": "integer",
                "minimum": 0,
                "maximum": 86400,
                "optional": true,
                "description": "Time-to-live of the message in seconds. If it is not possible to send the message within that time, an onSendError event will be raised. A time-to-live of 0 indicates that the message should be sent immediately or fail if it's not possible. The maximum and a default value of time-to-live is 86400 seconds (1 day)."
              },
              "data": {
                "type": "object",
                "properties": {},
                "additionalProperties": {
                  "type": "string",
                  "minLength": 1
                },
                "description": "Message data to send to the server. Case-insensitive <code>goog.</code> and <code>google</code>, as well as case-sensitive <code>collapse_key</code> are disallowed as key prefixes. Sum of all key/value pairs should not exceed $(ref:gcm.MAX_MESSAGE_SIZE)."
              }
            }
          },
          {
            "name": "callback",
            "type": "function",
            "description": "A function called after the message is successfully queued for sending. $(ref:runtime.lastError) should be checked, to ensure a message was sent without problems.",
            "parameters": [
              {
                "name": "messageId",
                "type": "string",
                "description": "The ID of the message that the callback was issued for."
              }
            ]
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onMessage",
        "type": "function",
        "description": "Fired when a message is received through GCM.",
        "parameters": [
          {
            "name": "message",
            "type": "object",
            "description": "A message received from another party via GCM.",
            "properties": {
              "data": {
                "type": "object",
                "properties": {},
                "additionalProperties": {
                  "type": "string"
                },
                "description": "The message data."
              },
              "from": {
                "type": "string",
                "optional": true,
                "description": "The sender who issued the message."
              },
              "collapseKey": {
                "type": "string",
                "optional": true,
                "description": "The collapse key of a message. See <a href='cloudMessaging#collapsible_messages'>Collapsible Messages</a> section of Cloud Messaging documentation for details."
              }
            }
          }
        ]
      },
      {
        "name": "onMessagesDeleted",
        "type": "function",
        "description": "Fired when a GCM server had to delete messages sent by an app server to the application. See <a href='cloudMessaging#messages_deleted_event'>Messages deleted event</a> section of Cloud Messaging documentation for details on handling this event."
      },
      {
        "name": "onSendError",
        "type": "function",
        "description": "Fired when it was not possible to send a message to the GCM server.",
        "parameters": [
          {
            "name": "error",
            "type": "object",
            "description": "An error that occured while trying to send the message either in Chrome or on the GCM server. Application can retry sending the message with a reasonable backoff and possibly longer time-to-live.",
            "properties": {
              "errorMessage": {
                "type": "string",
                "description": "The error message describing the problem."
              },
              "messageId": {
                "type": "string",
                "optional": true,
                "description": "The ID of the message with this error, if error is related to a specific message."
              },
              "details": {
                "type": "object",
                "properties": {},
                "additionalProperties": {
                  "type": "string"
                },
                "description": "Additional details related to the error, when available."
              }
            }
          }
        ]
      }
    ],
    "dependencies": [
      "permission:gcm"
    ]
  },
  {
    "namespace": "history",
    "description": "Use the <code>chrome.history</code> API to interact with the browser's record of visited pages. You can add, remove, and query for URLs in the browser's history. To override the history page with your own version, see <a href='override'>Override Pages</a>.",
    "types": [
      {
        "id": "TransitionType",
        "type": "string",
        "enum": [
          "link",
          "typed",
          "auto_bookmark",
          "auto_subframe",
          "manual_subframe",
          "generated",
          "auto_toplevel",
          "form_submit",
          "reload",
          "keyword",
          "keyword_generated"
        ],
        "description": "The <a href='#transition_types'>transition type</a> for this visit from its referrer."
      },
      {
        "id": "HistoryItem",
        "type": "object",
        "description": "An object encapsulating one result of a history query.",
        "properties": {
          "id": {
            "type": "string",
            "minimum": 0,
            "description": "The unique identifier for the item."
          },
          "url": {
            "type": "string",
            "optional": true,
            "description": "The URL navigated to by a user."
          },
          "title": {
            "type": "string",
            "optional": true,
            "description": "The title of the page when it was last loaded."
          },
          "lastVisitTime": {
            "type": "number",
            "optional": true,
            "description": "When this page was last loaded, represented in milliseconds since the epoch."
          },
          "visitCount": {
            "type": "integer",
            "optional": true,
            "description": "The number of times the user has navigated to this page."
          },
          "typedCount": {
            "type": "integer",
            "optional": true,
            "description": "The number of times the user has navigated to this page by typing in the address."
          }
        }
      },
      {
        "id": "VisitItem",
        "type": "object",
        "description": "An object encapsulating one visit to a URL.",
        "properties": {
          "id": {
            "type": "string",
            "minimum": 0,
            "description": "The unique identifier for the item."
          },
          "visitId": {
            "type": "string",
            "description": "The unique identifier for this visit."
          },
          "visitTime": {
            "type": "number",
            "optional": true,
            "description": "When this visit occurred, represented in milliseconds since the epoch."
          },
          "referringVisitId": {
            "type": "string",
            "description": "The visit ID of the referrer."
          },
          "transition": {
            "$ref": "TransitionType",
            "description": "The <a href='#transition_types'>transition type</a> for this visit from its referrer."
          }
        }
      }
    ],
    "functions": [
      {
        "name": "search",
        "type": "function",
        "description": "Searches the history for the last visit time of each page matching the query.",
        "parameters": [
          {
            "name": "query",
            "type": "object",
            "properties": {
              "text": {
                "type": "string",
                "description": "A free-text query to the history service.  Leave empty to retrieve all pages."
              },
              "startTime": {
                "type": "number",
                "optional": true,
                "description": "Limit results to those visited after this date, represented in milliseconds since the epoch. If not specified, this defaults to 24 hours in the past."
              },
              "endTime": {
                "type": "number",
                "optional": true,
                "description": "Limit results to those visited before this date, represented in milliseconds since the epoch."
              },
              "maxResults": {
                "type": "integer",
                "optional": true,
                "minimum": 0,
                "description": "The maximum number of results to retrieve.  Defaults to 100."
              }
            }
          },
          {
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "name": "results",
                "type": "array",
                "items": {
                  "$ref": "HistoryItem"
                }
              }
            ]
          }
        ]
      },
      {
        "name": "getVisits",
        "type": "function",
        "description": "Retrieves information about visits to a URL.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "properties": {
              "url": {
                "type": "string",
                "description": "The URL for which to retrieve visit information.  It must be in the format as returned from a call to history.search."
              }
            }
          },
          {
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "name": "results",
                "type": "array",
                "items": {
                  "$ref": "VisitItem"
                }
              }
            ]
          }
        ]
      },
      {
        "name": "addUrl",
        "type": "function",
        "description": "Adds a URL to the history at the current time with a <a href='#transition_types'>transition type</a> of \"link\".",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "properties": {
              "url": {
                "type": "string",
                "description": "The URL to add."
              }
            }
          },
          {
            "name": "callback",
            "type": "function",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "deleteUrl",
        "type": "function",
        "description": "Removes all occurrences of the given URL from the history.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "properties": {
              "url": {
                "type": "string",
                "description": "The URL to remove."
              }
            }
          },
          {
            "name": "callback",
            "type": "function",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "deleteRange",
        "type": "function",
        "description": "Removes all items within the specified date range from the history.  Pages will not be removed from the history unless all visits fall within the range.",
        "parameters": [
          {
            "name": "range",
            "type": "object",
            "properties": {
              "startTime": {
                "type": "number",
                "description": "Items added to history after this date, represented in milliseconds since the epoch."
              },
              "endTime": {
                "type": "number",
                "description": "Items added to history before this date, represented in milliseconds since the epoch."
              }
            }
          },
          {
            "name": "callback",
            "type": "function",
            "parameters": []
          }
        ]
      },
      {
        "name": "deleteAll",
        "type": "function",
        "description": "Deletes all items from the history.",
        "parameters": [
          {
            "name": "callback",
            "type": "function",
            "parameters": []
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onVisited",
        "type": "function",
        "description": "Fired when a URL is visited, providing the HistoryItem data for that URL.  This event fires before the page has loaded.",
        "parameters": [
          {
            "name": "result",
            "$ref": "HistoryItem"
          }
        ]
      },
      {
        "name": "onVisitRemoved",
        "type": "function",
        "description": "Fired when one or more URLs are removed from the history service.  When all visits have been removed the URL is purged from history.",
        "parameters": [
          {
            "name": "removed",
            "type": "object",
            "properties": {
              "allHistory": {
                "type": "boolean",
                "description": "True if all history was removed.  If true, then urls will be empty."
              },
              "urls": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "optional": true
              }
            }
          }
        ]
      }
    ],
    "dependencies": [
      "permission:history"
    ]
  },
  {
    "namespace": "i18n",
    "description": "Use the <code>chrome.i18n</code> infrastructure to implement internationalization across your whole app or extension.",
    "types": [
      {
        "id": "LanguageCode",
        "type": "string",
        "description": "An ISO language code such as <code>en</code> or <code>fr</code>. For a complete list of languages supported by this method, see <a href='http://src.chromium.org/viewvc/chrome/trunk/src/third_party/cld/languages/internal/languages.cc'>kLanguageInfoTable</a>. For an unknown language, <code>und</code> will be returned, which means that [percentage] of the text is unknown to CLD"
      }
    ],
    "functions": [
      {
        "name": "getAcceptLanguages",
        "type": "function",
        "description": "Gets the accept-languages of the browser. This is different from the locale used by the browser; to get the locale, use $(ref:i18n.getUILanguage).",
        "parameters": [
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "languages",
                "type": "array",
                "items": {
                  "$ref": "LanguageCode"
                },
                "description": "Array of LanguageCode"
              }
            ]
          }
        ]
      },
      {
        "name": "getMessage",
        "nocompile": true,
        "type": "function",
        "description": "Gets the localized string for the specified message. If the message is missing, this method returns an empty string (''). If the format of the <code>getMessage()</code> call is wrong &mdash; for example, <em>messageName</em> is not a string or the <em>substitutions</em> array has more than 9 elements &mdash; this method returns <code>undefined</code>.",
        "parameters": [
          {
            "type": "string",
            "name": "messageName",
            "description": "The name of the message, as specified in the <a href='i18n-messages'><code>messages.json</code></a> file."
          },
          {
            "type": "any",
            "name": "substitutions",
            "optional": true,
            "description": "Up to 9 substitution strings, if the message requires any."
          }
        ],
        "returns": {
          "type": "string",
          "description": "Message localized for current locale."
        }
      },
      {
        "name": "getUILanguage",
        "type": "function",
        "nocompile": true,
        "description": "Gets the browser UI language of the browser. This is different from $(ref:i18n.getAcceptLanguages) which returns the preferred user languages.",
        "parameters": [],
        "returns": {
          "type": "string",
          "description": "The browser UI language code such as en-US or fr-FR."
        }
      },
      {
        "name": "detectLanguage",
        "type": "function",
        "nocompile": true,
        "description": "Detects the language of the provided text using CLD.",
        "parameters": [
          {
            "type": "string",
            "name": "text",
            "minimum": 0,
            "description": "User input string to be translated."
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "type": "object",
                "name": "result",
                "description": "LanguageDetectionResult object that holds detected langugae reliability and array of DetectedLanguage",
                "properties": {
                  "isReliable": {
                    "type": "boolean",
                    "description": "CLD detected language reliability"
                  },
                  "languages": {
                    "type": "array",
                    "description": "array of detectedLanguage",
                    "items": {
                      "type": "object",
                      "description": "DetectedLanguage object that holds detected ISO language code and its percentage in the input string",
                      "properties": {
                        "language": {
                          "$ref": "LanguageCode"
                        },
                        "percentage": {
                          "type": "integer",
                          "description": "The percentage of the detected language"
                        }
                      }
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    ],
    "events": [],
    "content_script": true
  },
  {
    "types": [
      {
        "id": "AccountInfo",
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          }
        }
      },
      {
        "id": "ProfileUserInfo",
        "type": "object",
        "properties": {
          "email": {
            "type": "string"
          },
          "id": {
            "type": "string"
          }
        }
      },
      {
        "id": "TokenDetails",
        "type": "object",
        "properties": {
          "interactive": {
            "type": "boolean",
            "nullable": true
          },
          "account": {
            "$ref": "AccountInfo",
            "nullable": true
          },
          "scopes": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "nullable": true
          }
        }
      },
      {
        "id": "InvalidTokenDetails",
        "type": "object",
        "properties": {
          "token": {
            "type": "string"
          }
        }
      },
      {
        "id": "WebAuthFlowDetails",
        "type": "object",
        "properties": {
          "url": {
            "type": "string"
          },
          "interactive": {
            "type": "boolean",
            "nullable": true
          }
        }
      }
    ],
    "functions": [
      {
        "name": "getAccounts",
        "type": "function",
        "parameters": [
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "type": "array",
                "items": {
                  "$ref": "AccountInfo"
                },
                "optional": false,
                "name": "accounts"
              }
            ]
          }
        ],
        "static": true,
        "dependencies": [
          "permission:identity"
        ]
      },
      {
        "name": "getAuthToken",
        "type": "function",
        "parameters": [
          {
            "$ref": "TokenDetails",
            "optional": true,
            "name": "details"
          },
          {
            "optional": true,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "type": "string",
                "optional": true,
                "name": "token"
              }
            ]
          }
        ],
        "static": true
      },
      {
        "name": "getProfileUserInfo",
        "type": "function",
        "parameters": [
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "$ref": "ProfileUserInfo",
                "optional": false,
                "name": "userInfo"
              }
            ]
          }
        ],
        "static": true
      },
      {
        "name": "removeCachedAuthToken",
        "type": "function",
        "parameters": [
          {
            "$ref": "InvalidTokenDetails",
            "optional": false,
            "name": "details"
          },
          {
            "optional": true,
            "name": "callback",
            "type": "function",
            "parameters": []
          }
        ],
        "static": true
      },
      {
        "name": "launchWebAuthFlow",
        "type": "function",
        "parameters": [
          {
            "$ref": "WebAuthFlowDetails",
            "optional": false,
            "name": "details"
          },
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "type": "string",
                "optional": true,
                "name": "responseUrl"
              }
            ]
          }
        ],
        "static": true
      },
      {
        "name": "getRedirectURL",
        "type": "function",
        "parameters": [
          {
            "type": "string",
            "optional": true,
            "name": "path"
          }
        ],
        "static": true
      }
    ],
    "events": [
      {
        "name": "onSignInChanged",
        "type": "function",
        "parameters": [
          {
            "$ref": "AccountInfo",
            "optional": false,
            "name": "account"
          },
          {
            "type": "boolean",
            "optional": false,
            "name": "signedIn"
          }
        ]
      }
    ],
    "namespace": "identity",
    "dependencies": [
      "permission:identity"
    ]
  },
  {
    "namespace": "idle",
    "description": "Use the <code>chrome.idle</code> API to detect when the machine's idle state changes.",
    "types": [
      {
        "id": "IdleState",
        "type": "string",
        "enum": [
          "active",
          "idle",
          "locked"
        ]
      }
    ],
    "functions": [
      {
        "name": "queryState",
        "type": "function",
        "description": "Returns \"locked\" if the system is locked, \"idle\" if the user has not generated any input for a specified number of seconds, or \"active\" otherwise.",
        "parameters": [
          {
            "name": "detectionIntervalInSeconds",
            "type": "integer",
            "minimum": 15,
            "description": "The system is considered idle if detectionIntervalInSeconds seconds have elapsed since the last user input detected."
          },
          {
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "name": "newState",
                "$ref": "IdleState"
              }
            ]
          }
        ]
      },
      {
        "name": "setDetectionInterval",
        "type": "function",
        "description": "Sets the interval, in seconds, used to determine when the system is in an idle state for onStateChanged events. The default interval is 60 seconds.",
        "parameters": [
          {
            "name": "intervalInSeconds",
            "type": "integer",
            "minimum": 15,
            "description": "Threshold, in seconds, used to determine when the system is in an idle state."
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onStateChanged",
        "type": "function",
        "description": "Fired when the system changes to an active, idle or locked state. The event fires with \"locked\" if the screen is locked or the screensaver activates, \"idle\" if the system is unlocked and the user has not generated any input for a specified number of seconds, and \"active\" when the user generates input on an idle system.",
        "parameters": [
          {
            "name": "newState",
            "$ref": "IdleState"
          }
        ]
      }
    ],
    "dependencies": [
      "permission:idle"
    ]
  },
  {
    "namespace": "instanceID",
    "description": "Use <code>chrome.instanceID</code> to access the Instance ID service.",
    "functions": [
      {
        "name": "getID",
        "type": "function",
        "description": "Retrieves an identifier for the app instance. The instance ID will be returned by the <code>callback</code>. The same ID will be returned as long as the application identity has not been revoked or expired.",
        "parameters": [
          {
            "name": "callback",
            "type": "function",
            "description": "Function called when the retrieval completes. It should check $(ref:runtime.lastError) for error when instanceID is empty.",
            "parameters": [
              {
                "name": "instanceID",
                "type": "string",
                "description": "An Instance ID assigned to the app instance."
              }
            ]
          }
        ]
      },
      {
        "name": "getCreationTime",
        "type": "function",
        "description": "Retrieves the time when the InstanceID has been generated. The creation time will be returned by the <code>callback</code>.",
        "parameters": [
          {
            "name": "callback",
            "type": "function",
            "description": "Function called when the retrieval completes. It should check $(ref:runtime.lastError) for error when creationTime is zero.",
            "parameters": [
              {
                "name": "creationTime",
                "type": "number",
                "description": "The time when the Instance ID has been generated, represented in milliseconds since the epoch."
              }
            ]
          }
        ]
      },
      {
        "name": "getToken",
        "type": "function",
        "description": "Return a token that allows the authorized entity to access the service defined by scope.",
        "parameters": [
          {
            "name": "getTokenParams",
            "type": "object",
            "description": "Parameters for getToken.",
            "properties": {
              "authorizedEntity": {
                "type": "string",
                "minLength": 1,
                "description": "Identifies the entity that is authorized to access resources associated with this Instance ID. It can be a project ID from <a href='https://code.google.com/apis/console'>Google developer console</a>."
              },
              "scope": {
                "type": "string",
                "minLength": 1,
                "description": "Identifies authorized actions that the authorized entity can take. E.g. for sending GCM messages, <code>GCM</code> scope should be used."
              },
              "options": {
                "type": "object",
                "properties": {},
                "additionalProperties": {
                  "type": "string",
                  "minLength": 1
                },
                "optional": true,
                "description": "Allows including a small number of string key/value pairs that will be associated with the token and may be used in processing the request."
              }
            }
          },
          {
            "name": "callback",
            "type": "function",
            "description": "Function called when the retrieval completes. It should check $(ref:runtime.lastError) for error when token is empty.",
            "parameters": [
              {
                "name": "token",
                "type": "string",
                "description": "A token assigned by the requested service."
              }
            ]
          }
        ]
      },
      {
        "name": "deleteToken",
        "type": "function",
        "description": "Revokes a granted token.",
        "parameters": [
          {
            "name": "deleteTokenParams",
            "type": "object",
            "description": "Parameters for deleteToken.",
            "properties": {
              "authorizedEntity": {
                "type": "string",
                "minLength": 1,
                "description": "The authorized entity that is used to obtain the token."
              },
              "scope": {
                "type": "string",
                "minLength": 1,
                "description": "The scope that is used to obtain the token."
              }
            }
          },
          {
            "name": "callback",
            "type": "function",
            "description": "Function called when the token deletion completes. The token was revoked successfully if $(ref:runtime.lastError) is not set.",
            "parameters": []
          }
        ]
      },
      {
        "name": "deleteID",
        "type": "function",
        "description": "Resets the app instance identifier and revokes all tokens associated with it.",
        "parameters": [
          {
            "name": "callback",
            "type": "function",
            "description": "Function called when the deletion completes. The instance identifier was revoked successfully if $(ref:runtime.lastError) is not set.",
            "parameters": []
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onTokenRefresh",
        "type": "function",
        "description": "Fired when all the granted tokens need to be refreshed."
      }
    ],
    "dependencies": [
      "permission:gcm"
    ]
  },
  {
    "namespace": "management",
    "description": "The <code>chrome.management</code> API provides ways to manage the list of extensions/apps that are installed and running. It is particularly useful for extensions that <a href='override'>override</a> the built-in New Tab page.",
    "types": [
      {
        "id": "IconInfo",
        "description": "Information about an icon belonging to an extension, app, or theme.",
        "type": "object",
        "properties": {
          "size": {
            "type": "integer",
            "description": "A number representing the width and height of the icon. Likely values include (but are not limited to) 128, 48, 24, and 16."
          },
          "url": {
            "type": "string",
            "description": "The URL for this icon image. To display a grayscale version of the icon (to indicate that an extension is disabled, for example), append <code>?grayscale=true</code> to the URL."
          }
        }
      },
      {
        "id": "LaunchType",
        "type": "string",
        "enum": [
          "OPEN_AS_REGULAR_TAB",
          "OPEN_AS_PINNED_TAB",
          "OPEN_AS_WINDOW",
          "OPEN_FULL_SCREEN"
        ],
        "description": "These are all possible app launch types."
      },
      {
        "id": "ExtensionDisabledReason",
        "description": "A reason the item is disabled.",
        "type": "string",
        "enum": [
          "unknown",
          "permissions_increase"
        ]
      },
      {
        "id": "ExtensionType",
        "description": "The type of this extension, app, or theme.",
        "type": "string",
        "enum": [
          "extension",
          "hosted_app",
          "packaged_app",
          "legacy_packaged_app",
          "theme"
        ]
      },
      {
        "id": "ExtensionInstallType",
        "description": "How the extension was installed. One of<br><var>admin</var>: The extension was installed because of an administrative policy,<br><var>development</var>: The extension was loaded unpacked in developer mode,<br><var>normal</var>: The extension was installed normally via a .crx file,<br><var>sideload</var>: The extension was installed by other software on the machine,<br><var>other</var>: The extension was installed by other means.",
        "type": "string",
        "enum": [
          "admin",
          "development",
          "normal",
          "sideload",
          "other"
        ]
      },
      {
        "id": "ExtensionInfo",
        "description": "Information about an installed extension, app, or theme.",
        "type": "object",
        "properties": {
          "id": {
            "description": "The extension's unique identifier.",
            "type": "string"
          },
          "name": {
            "description": "The name of this extension, app, or theme.",
            "type": "string"
          },
          "shortName": {
            "description": "A short version of the name of this extension, app, or theme.",
            "type": "string"
          },
          "description": {
            "description": "The description of this extension, app, or theme.",
            "type": "string"
          },
          "version": {
            "description": "The <a href='manifest/version'>version</a> of this extension, app, or theme.",
            "type": "string"
          },
          "versionName": {
            "description": "The <a href='manifest/version#version_name'>version name</a> of this extension, app, or theme if the manifest specified one.",
            "type": "string",
            "optional": true
          },
          "mayDisable": {
            "description": "Whether this extension can be disabled or uninstalled by the user.",
            "type": "boolean"
          },
          "enabled": {
            "description": "Whether it is currently enabled or disabled.",
            "type": "boolean"
          },
          "disabledReason": {
            "description": "A reason the item is disabled.",
            "$ref": "ExtensionDisabledReason",
            "optional": true
          },
          "isApp": {
            "description": "True if this is an app.",
            "type": "boolean",
            "deprecated": "Please use $(ref:management.ExtensionInfo.type)."
          },
          "type": {
            "description": "The type of this extension, app, or theme.",
            "$ref": "ExtensionType"
          },
          "appLaunchUrl": {
            "description": "The launch url (only present for apps).",
            "type": "string",
            "optional": true
          },
          "homepageUrl": {
            "description": "The URL of the homepage of this extension, app, or theme.",
            "type": "string",
            "optional": true
          },
          "updateUrl": {
            "description": "The update URL of this extension, app, or theme.",
            "type": "string",
            "optional": true
          },
          "offlineEnabled": {
            "description": "Whether the extension, app, or theme declares that it supports offline.",
            "type": "boolean"
          },
          "optionsUrl": {
            "description": "The url for the item's options page, if it has one.",
            "type": "string"
          },
          "icons": {
            "description": "A list of icon information. Note that this just reflects what was declared in the manifest, and the actual image at that url may be larger or smaller than what was declared, so you might consider using explicit width and height attributes on img tags referencing these images. See the <a href='manifest/icons'>manifest documentation on icons</a> for more details.",
            "type": "array",
            "optional": true,
            "items": {
              "$ref": "IconInfo"
            }
          },
          "permissions": {
            "description": "Returns a list of API based permissions.",
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "hostPermissions": {
            "description": "Returns a list of host based permissions.",
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "installType": {
            "description": "How the extension was installed.",
            "$ref": "ExtensionInstallType"
          },
          "launchType": {
            "description": "The app launch type (only present for apps).",
            "$ref": "LaunchType",
            "optional": true
          },
          "availableLaunchTypes": {
            "description": "The currently available launch types (only present for apps).",
            "type": "array",
            "optional": true,
            "items": {
              "$ref": "LaunchType"
            }
          }
        }
      }
    ],
    "functions": [
      {
        "name": "getAll",
        "description": "Returns a list of information about installed extensions and apps.",
        "parameters": [
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": [
              {
                "type": "array",
                "name": "result",
                "items": {
                  "$ref": "ExtensionInfo"
                }
              }
            ]
          }
        ]
      },
      {
        "name": "get",
        "description": "Returns information about the installed extension, app, or theme that has the given ID.",
        "parameters": [
          {
            "name": "id",
            "type": "string",
            "description": "The ID from an item of $(ref:management.ExtensionInfo)."
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": [
              {
                "name": "result",
                "$ref": "ExtensionInfo"
              }
            ]
          }
        ]
      },
      {
        "name": "getSelf",
        "description": "Returns information about the calling extension, app, or theme. Note: This function can be used without requesting the 'management' permission in the manifest.",
        "parameters": [
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": [
              {
                "name": "result",
                "$ref": "ExtensionInfo"
              }
            ]
          }
        ],
        "dependencies": []
      },
      {
        "name": "getPermissionWarningsById",
        "description": "Returns a list of <a href='permission_warnings'>permission warnings</a> for the given extension id.",
        "parameters": [
          {
            "name": "id",
            "type": "string",
            "description": "The ID of an already installed extension."
          },
          {
            "name": "callback",
            "type": "function",
            "optional": true,
            "parameters": [
              {
                "name": "permissionWarnings",
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            ]
          }
        ]
      },
      {
        "name": "getPermissionWarningsByManifest",
        "description": "Returns a list of <a href='permission_warnings'>permission warnings</a> for the given extension manifest string. Note: This function can be used without requesting the 'management' permission in the manifest.",
        "parameters": [
          {
            "name": "manifestStr",
            "type": "string",
            "description": "Extension manifest JSON string."
          },
          {
            "name": "callback",
            "type": "function",
            "optional": true,
            "parameters": [
              {
                "name": "permissionWarnings",
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            ]
          }
        ],
        "dependencies": []
      },
      {
        "name": "setEnabled",
        "description": "Enables or disables an app or extension. In most cases this function must be called in the context of a user gesture (e.g. an onclick handler for a button), and may present the user with a native confirmation UI as a way of preventing abuse.",
        "parameters": [
          {
            "name": "id",
            "type": "string",
            "description": "This should be the id from an item of $(ref:management.ExtensionInfo)."
          },
          {
            "name": "enabled",
            "type": "boolean",
            "description": "Whether this item should be enabled or disabled."
          },
          {
            "name": "callback",
            "type": "function",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "uninstall",
        "description": "Uninstalls a currently installed app or extension.",
        "parameters": [
          {
            "name": "id",
            "type": "string",
            "description": "This should be the id from an item of $(ref:management.ExtensionInfo)."
          },
          {
            "type": "object",
            "name": "options",
            "optional": true,
            "properties": {
              "showConfirmDialog": {
                "type": "boolean",
                "optional": true,
                "description": "Whether or not a confirm-uninstall dialog should prompt the user. Defaults to false for self uninstalls. If an extension uninstalls another extension, this parameter is ignored and the dialog is always shown."
              }
            }
          },
          {
            "name": "callback",
            "type": "function",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "uninstallSelf",
        "description": "Uninstalls the calling extension. Note: This function can be used without requesting the 'management' permission in the manifest.",
        "parameters": [
          {
            "type": "object",
            "name": "options",
            "optional": true,
            "properties": {
              "showConfirmDialog": {
                "type": "boolean",
                "optional": true,
                "description": "Whether or not a confirm-uninstall dialog should prompt the user. Defaults to false."
              }
            }
          },
          {
            "name": "callback",
            "type": "function",
            "optional": true,
            "parameters": []
          }
        ],
        "dependencies": []
      },
      {
        "name": "launchApp",
        "description": "Launches an application.",
        "parameters": [
          {
            "name": "id",
            "type": "string",
            "description": "The extension id of the application."
          },
          {
            "name": "callback",
            "type": "function",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "createAppShortcut",
        "description": "Display options to create shortcuts for an app. On Mac, only packaged app shortcuts can be created.",
        "parameters": [
          {
            "name": "id",
            "type": "string",
            "description": "This should be the id from an app item of $(ref:management.ExtensionInfo)."
          },
          {
            "name": "callback",
            "type": "function",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "setLaunchType",
        "description": "Set the launch type of an app.",
        "parameters": [
          {
            "name": "id",
            "type": "string",
            "description": "This should be the id from an app item of $(ref:management.ExtensionInfo)."
          },
          {
            "name": "launchType",
            "$ref": "LaunchType",
            "description": "The target launch type. Always check and make sure this launch type is in $(ref:ExtensionInfo.availableLaunchTypes), because the available launch types vary on different platforms and configurations."
          },
          {
            "name": "callback",
            "type": "function",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "generateAppForLink",
        "description": "Generate an app for a URL. Returns the generated bookmark app.",
        "parameters": [
          {
            "name": "url",
            "type": "string",
            "description": "The URL of a web page. The scheme of the URL can only be \"http\" or \"https\"."
          },
          {
            "name": "title",
            "type": "string",
            "description": "The title of the generated app."
          },
          {
            "name": "callback",
            "type": "function",
            "optional": true,
            "parameters": [
              {
                "name": "result",
                "$ref": "ExtensionInfo"
              }
            ]
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onInstalled",
        "description": "Fired when an app or extension has been installed.",
        "type": "function",
        "parameters": [
          {
            "name": "info",
            "$ref": "ExtensionInfo"
          }
        ]
      },
      {
        "name": "onUninstalled",
        "description": "Fired when an app or extension has been uninstalled.",
        "type": "function",
        "parameters": [
          {
            "name": "id",
            "type": "string",
            "description": "The id of the extension, app, or theme that was uninstalled."
          }
        ]
      },
      {
        "name": "onEnabled",
        "description": "Fired when an app or extension has been enabled.",
        "type": "function",
        "parameters": [
          {
            "name": "info",
            "$ref": "ExtensionInfo"
          }
        ]
      },
      {
        "name": "onDisabled",
        "description": "Fired when an app or extension has been disabled.",
        "type": "function",
        "parameters": [
          {
            "name": "info",
            "$ref": "ExtensionInfo"
          }
        ]
      }
    ]
  },
  {
    "types": [
      {
        "id": "TemplateType",
        "type": "string",
        "enum": [
          "basic",
          "image",
          "list",
          "progress"
        ]
      },
      {
        "id": "PermissionLevel",
        "type": "string",
        "enum": [
          "granted",
          "denied"
        ]
      },
      {
        "id": "NotificationItem",
        "type": "object",
        "properties": {
          "title": {
            "type": "string"
          },
          "message": {
            "type": "string"
          }
        }
      },
      {
        "id": "NotificationBitmap",
        "type": "object",
        "properties": {
          "width": {
            "type": "integer"
          },
          "height": {
            "type": "integer"
          },
          "data": {
            "$ref": "ArrayBuffer",
            "nullable": true
          }
        }
      },
      {
        "id": "NotificationButton",
        "type": "object",
        "properties": {
          "title": {
            "type": "string"
          },
          "iconUrl": {
            "type": "string",
            "nullable": true
          },
          "iconBitmap": {
            "$ref": "NotificationBitmap",
            "nullable": true
          }
        }
      },
      {
        "id": "NotificationOptions",
        "type": "object",
        "properties": {
          "type": {
            "$ref": "TemplateType",
            "nullable": true
          },
          "iconUrl": {
            "type": "string",
            "nullable": true
          },
          "iconBitmap": {
            "$ref": "NotificationBitmap",
            "nullable": true
          },
          "appIconMaskUrl": {
            "type": "string",
            "nullable": true
          },
          "appIconMaskBitmap": {
            "$ref": "NotificationBitmap",
            "nullable": true
          },
          "title": {
            "type": "string",
            "nullable": true
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "contextMessage": {
            "type": "string",
            "nullable": true
          },
          "priority": {
            "type": "integer",
            "nullable": true
          },
          "eventTime": {
            "type": "number",
            "nullable": true
          },
          "buttons": {
            "type": "array",
            "items": {
              "$ref": "NotificationButton"
            },
            "nullable": true
          },
          "expandedMessage": {
            "type": "string",
            "nullable": true
          },
          "imageUrl": {
            "type": "string",
            "nullable": true
          },
          "imageBitmap": {
            "$ref": "NotificationBitmap",
            "nullable": true
          },
          "items": {
            "type": "array",
            "items": {
              "$ref": "NotificationItem"
            },
            "nullable": true
          },
          "progress": {
            "type": "integer",
            "nullable": true
          },
          "isClickable": {
            "type": "boolean",
            "nullable": true
          },
          "requireInteraction": {
            "type": "boolean",
            "nullable": true
          }
        }
      }
    ],
    "functions": [
      {
        "name": "create",
        "type": "function",
        "parameters": [
          {
            "type": "string",
            "optional": true,
            "name": "notificationId"
          },
          {
            "$ref": "NotificationOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": true,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "type": "string",
                "optional": false,
                "name": "notificationId"
              }
            ]
          }
        ],
        "static": true
      },
      {
        "name": "update",
        "type": "function",
        "parameters": [
          {
            "type": "string",
            "optional": false,
            "name": "notificationId"
          },
          {
            "$ref": "NotificationOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": true,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "type": "boolean",
                "optional": false,
                "name": "wasUpdated"
              }
            ]
          }
        ],
        "static": true
      },
      {
        "name": "clear",
        "type": "function",
        "parameters": [
          {
            "type": "string",
            "optional": false,
            "name": "notificationId"
          },
          {
            "optional": true,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "type": "boolean",
                "optional": false,
                "name": "wasCleared"
              }
            ]
          }
        ],
        "static": true
      },
      {
        "name": "getAll",
        "type": "function",
        "parameters": [
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "type": "object",
                "optional": false,
                "name": "notifications"
              }
            ]
          }
        ],
        "static": true
      },
      {
        "name": "getPermissionLevel",
        "type": "function",
        "parameters": [
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "$ref": "PermissionLevel",
                "optional": false,
                "name": "level"
              }
            ]
          }
        ],
        "static": true
      }
    ],
    "events": [
      {
        "name": "onClosed",
        "type": "function",
        "parameters": [
          {
            "type": "string",
            "optional": false,
            "name": "notificationId"
          },
          {
            "type": "boolean",
            "optional": false,
            "name": "byUser"
          }
        ]
      },
      {
        "name": "onClicked",
        "type": "function",
        "parameters": [
          {
            "type": "string",
            "optional": false,
            "name": "notificationId"
          }
        ]
      },
      {
        "name": "onButtonClicked",
        "type": "function",
        "parameters": [
          {
            "type": "string",
            "optional": false,
            "name": "notificationId"
          },
          {
            "type": "integer",
            "optional": false,
            "name": "buttonIndex"
          }
        ]
      },
      {
        "name": "onPermissionLevelChanged",
        "type": "function",
        "parameters": [
          {
            "$ref": "PermissionLevel",
            "optional": false,
            "name": "level"
          }
        ]
      },
      {
        "name": "onShowSettings",
        "type": "function"
      }
    ],
    "namespace": "notifications",
    "dependencies": [
      "permission:notifications"
    ]
  },
  {
    "namespace": "omnibox",
    "description": "The omnibox API allows you to register a keyword with Google Chrome's address bar, which is also known as the omnibox.",
    "types": [
      {
        "id": "DescriptionStyleType",
        "type": "string",
        "description": "The style type.",
        "enum": [
          "url",
          "match",
          "dim"
        ]
      },
      {
        "id": "OnInputEnteredDisposition",
        "type": "string",
        "enum": [
          "currentTab",
          "newForegroundTab",
          "newBackgroundTab"
        ],
        "description": "The window disposition for the omnibox query. This is the recommended context to display results. For example, if the omnibox command is to navigate to a certain URL, a disposition of 'newForegroundTab' means the navigation should take place in a new selected tab."
      },
      {
        "id": "SuggestResult",
        "type": "object",
        "description": "A suggest result.",
        "properties": {
          "content": {
            "type": "string",
            "minLength": 1,
            "description": "The text that is put into the URL bar, and that is sent to the extension when the user chooses this entry."
          },
          "description": {
            "type": "string",
            "minLength": 1,
            "description": "The text that is displayed in the URL dropdown. Can contain XML-style markup for styling. The supported tags are 'url' (for a literal URL), 'match' (for highlighting text that matched what the user's query), and 'dim' (for dim helper text). The styles can be nested, eg. <dim><match>dimmed match</match></dim>. You must escape the five predefined entities to display them as text: stackoverflow.com/a/1091953/89484 "
          },
          "descriptionStyles": {
            "nodoc": true,
            "optional": true,
            "type": "array",
            "description": "An array of style ranges for the description, as provided by the extension.",
            "items": {
              "type": "object",
              "name": "matchClassification",
              "description": "The style ranges for the description, as provided by the extension.",
              "properties": {
                "offset": {
                  "type": "integer"
                },
                "type": {
                  "description": "The style type",
                  "$ref": "DescriptionStyleType"
                },
                "length": {
                  "type": "integer",
                  "optional": true
                }
              }
            }
          },
          "descriptionStylesRaw": {
            "nodoc": true,
            "optional": true,
            "type": "array",
            "description": "An array of style ranges for the description, as provided by ToValue().",
            "items": {
              "type": "object",
              "name": "matchClassification",
              "description": "The style ranges for the description, as provided by ToValue().",
              "properties": {
                "offset": {
                  "type": "integer"
                },
                "type": {
                  "type": "integer"
                }
              }
            }
          }
        }
      },
      {
        "id": "DefaultSuggestResult",
        "inline_doc": true,
        "type": "object",
        "description": "A suggest result.",
        "properties": {
          "description": {
            "type": "string",
            "minLength": 1,
            "description": "The text that is displayed in the URL dropdown. Can contain XML-style markup for styling. The supported tags are 'url' (for a literal URL), 'match' (for highlighting text that matched what the user's query), and 'dim' (for dim helper text). The styles can be nested, eg. <dim><match>dimmed match</match></dim>."
          },
          "descriptionStyles": {
            "nodoc": true,
            "optional": true,
            "type": "array",
            "description": "An array of style ranges for the description, as provided by the extension.",
            "items": {
              "type": "object",
              "name": "matchClassification",
              "description": "The style ranges for the description, as provided by the extension.",
              "properties": {
                "offset": {
                  "type": "integer"
                },
                "type": {
                  "description": "The style type",
                  "$ref": "DescriptionStyleType"
                },
                "length": {
                  "type": "integer",
                  "optional": true
                }
              }
            }
          },
          "descriptionStylesRaw": {
            "nodoc": true,
            "optional": true,
            "type": "array",
            "description": "An array of style ranges for the description, as provided by ToValue().",
            "items": {
              "type": "object",
              "name": "matchClassification",
              "description": "The style ranges for the description, as provided by ToValue().",
              "properties": {
                "offset": {
                  "type": "integer"
                },
                "type": {
                  "type": "integer"
                }
              }
            }
          }
        }
      }
    ],
    "functions": [
      {
        "name": "sendSuggestions",
        "nodoc": true,
        "type": "function",
        "description": "A callback passed to the onInputChanged event used for sending suggestions back to the browser.",
        "parameters": [
          {
            "type": "integer",
            "name": "requestId"
          },
          {
            "name": "suggestResults",
            "type": "array",
            "description": "An array of suggest results",
            "items": {
              "$ref": "SuggestResult"
            }
          }
        ]
      },
      {
        "name": "setDefaultSuggestion",
        "type": "function",
        "description": "Sets the description and styling for the default suggestion. The default suggestion is the text that is displayed in the first suggestion row underneath the URL bar.",
        "parameters": [
          {
            "name": "suggestion",
            "$ref": "DefaultSuggestResult",
            "description": "A partial SuggestResult object, without the 'content' parameter."
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onInputStarted",
        "type": "function",
        "description": "User has started a keyword input session by typing the extension's keyword. This is guaranteed to be sent exactly once per input session, and before any onInputChanged events.",
        "parameters": []
      },
      {
        "name": "onInputChanged",
        "type": "function",
        "description": "User has changed what is typed into the omnibox.",
        "parameters": [
          {
            "type": "string",
            "name": "text"
          },
          {
            "name": "suggest",
            "type": "function",
            "description": "A callback passed to the onInputChanged event used for sending suggestions back to the browser.",
            "parameters": [
              {
                "name": "suggestResults",
                "type": "array",
                "description": "Array of suggest results",
                "items": {
                  "$ref": "SuggestResult"
                }
              }
            ]
          }
        ]
      },
      {
        "name": "onInputEntered",
        "type": "function",
        "description": "User has accepted what is typed into the omnibox.",
        "parameters": [
          {
            "type": "string",
            "name": "text"
          },
          {
            "name": "disposition",
            "$ref": "OnInputEnteredDisposition"
          }
        ]
      },
      {
        "name": "onInputCancelled",
        "type": "function",
        "description": "User has ended the keyword input session without accepting the input.",
        "parameters": []
      }
    ],
    "dependencies": [
      "manifest:omnibox"
    ]
  },
  {
    "namespace": "pageAction",
    "description": "Use the <code>chrome.pageAction</code> API to put icons in the main Google Chrome toolbar, to the right of the address bar. Page actions represent actions that can be taken on the current page, but that aren't applicable to all pages. Page actions appear grayed out when inactive.",
    "types": [
      {
        "id": "ImageDataType",
        "type": "object",
        "isInstanceOf": "ImageData",
        "additionalProperties": {
          "type": "any"
        },
        "description": "Pixel data for an image. Must be an ImageData object (for example, from a <code>canvas</code> element)."
      }
    ],
    "functions": [
      {
        "name": "show",
        "type": "function",
        "description": "Shows the page action. The page action is shown whenever the tab is selected.",
        "parameters": [
          {
            "type": "integer",
            "name": "tabId",
            "minimum": 0,
            "description": "The id of the tab for which you want to modify the page action."
          }
        ]
      },
      {
        "name": "hide",
        "type": "function",
        "description": "Hides the page action. Hidden page actions still appear in the Chrome toolbar, but are grayed out.",
        "parameters": [
          {
            "type": "integer",
            "name": "tabId",
            "minimum": 0,
            "description": "The id of the tab for which you want to modify the page action."
          }
        ]
      },
      {
        "name": "setTitle",
        "type": "function",
        "description": "Sets the title of the page action. This is displayed in a tooltip over the page action.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "properties": {
              "tabId": {
                "type": "integer",
                "minimum": 0,
                "description": "The id of the tab for which you want to modify the page action."
              },
              "title": {
                "type": "string",
                "description": "The tooltip string."
              }
            }
          }
        ]
      },
      {
        "name": "getTitle",
        "type": "function",
        "description": "Gets the title of the page action.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "properties": {
              "tabId": {
                "type": "integer",
                "description": "Specify the tab to get the title from."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "result",
                "type": "string"
              }
            ]
          }
        ]
      },
      {
        "name": "setIcon",
        "type": "function",
        "description": "Sets the icon for the page action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element, or as dictionary of either one of those. Either the <b>path</b> or the <b>imageData</b> property must be specified.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "properties": {
              "tabId": {
                "type": "integer",
                "minimum": 0,
                "description": "The id of the tab for which you want to modify the page action."
              },
              "imageData": {
                "choices": [
                  {
                    "$ref": "ImageDataType"
                  },
                  {
                    "type": "object",
                    "additionalProperties": {
                      "type": "any"
                    }
                  }
                ],
                "optional": true,
                "description": "Either an ImageData object or a dictionary {size -> ImageData} representing icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals <code>scale</code>, then image with size <code>scale</code> * n will be selected, where n is the size of the icon in the UI. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'16': foo}'"
              },
              "path": {
                "choices": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "object",
                    "additionalProperties": {
                      "type": "any"
                    }
                  }
                ],
                "optional": true,
                "description": "Either a relative image path or a dictionary {size -> relative image path} pointing to icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals <code>scale</code>, then image with size <code>scale</code> * n will be selected, where n is the size of the icon in the UI. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.path = {'16': foo}'"
              },
              "iconIndex": {
                "type": "integer",
                "minimum": 0,
                "description": "<b>Deprecated.</b> This argument is ignored.",
                "optional": true
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "setPopup",
        "type": "function",
        "description": "Sets the html document to be opened as a popup when the user clicks on the page action's icon.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "properties": {
              "tabId": {
                "type": "integer",
                "minimum": 0,
                "description": "The id of the tab for which you want to modify the page action."
              },
              "popup": {
                "type": "string",
                "description": "The html file to show in a popup.  If set to the empty string (''), no popup is shown."
              }
            }
          }
        ]
      },
      {
        "name": "getPopup",
        "type": "function",
        "description": "Gets the html document set as the popup for this page action.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "properties": {
              "tabId": {
                "type": "integer",
                "description": "Specify the tab to get the popup from."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "result",
                "type": "string"
              }
            ]
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onClicked",
        "type": "function",
        "description": "Fired when a page action icon is clicked.  This event will not fire if the page action has a popup.",
        "parameters": [
          {
            "name": "tab",
            "$ref": "tabs.Tab"
          }
        ]
      }
    ],
    "dependencies": [
      "manifest:page_action"
    ]
  },
  {
    "namespace": "pageCapture",
    "description": "Use the <code>chrome.pageCapture</code> API to save a tab as MHTML.",
    "functions": [
      {
        "name": "saveAsMHTML",
        "type": "function",
        "description": "Saves the content of the tab with given id as MHTML.",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "properties": {
              "tabId": {
                "type": "integer",
                "minimum": 0,
                "description": "The id of the tab to save as MHTML."
              }
            }
          },
          {
            "name": "callback",
            "type": "function",
            "description": "Called when the MHTML has been generated.",
            "parameters": [
              {
                "name": "mhtmlData",
                "type": "binary",
                "optional": true,
                "description": "The MHTML data as a Blob."
              }
            ]
          }
        ]
      }
    ],
    "dependencies": [
      "permission:pageCapture"
    ]
  },
  {
    "namespace": "permissions",
    "description": "Use the <code>chrome.permissions</code> API to request <a href='permissions#manifest'>declared optional permissions</a> at run time rather than install time, so users understand why the permissions are needed and grant only those that are necessary.",
    "types": [
      {
        "id": "Permissions",
        "type": "object",
        "properties": {
          "permissions": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "optional": true,
            "description": "List of named permissions (does not include hosts or origins).  Anything listed here must appear in the <code>optional_permissions</code> list in the manifest."
          },
          "origins": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "optional": true,
            "description": "List of origin permissions. Anything listed here must be a subset of a host that appears in the <code>optional_permissions</code> list in the manifest. For example, if <code>http://*.example.com/</code> or <code>http://*/</code> appears in <code>optional_permissions</code>, you can request an origin of <code>http://help.example.com/</code>. Any path is ignored."
          }
        }
      }
    ],
    "events": [
      {
        "name": "onAdded",
        "type": "function",
        "description": "Fired when the extension acquires new permissions.",
        "parameters": [
          {
            "$ref": "Permissions",
            "name": "permissions",
            "description": "The newly acquired permissions."
          }
        ]
      },
      {
        "name": "onRemoved",
        "type": "function",
        "description": "Fired when access to permissions has been removed from the extension.",
        "parameters": [
          {
            "$ref": "Permissions",
            "name": "permissions",
            "description": "The permissions that have been removed."
          }
        ]
      }
    ],
    "functions": [
      {
        "name": "getAll",
        "type": "function",
        "description": "Gets the extension's current set of permissions.",
        "parameters": [
          {
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "name": "permissions",
                "$ref": "Permissions",
                "description": "The extension's active permissions."
              }
            ]
          }
        ]
      },
      {
        "name": "contains",
        "type": "function",
        "description": "Checks if the extension has the specified permissions.",
        "parameters": [
          {
            "name": "permissions",
            "$ref": "Permissions"
          },
          {
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "name": "result",
                "type": "boolean",
                "description": "True if the extension has the specified permissions."
              }
            ]
          }
        ]
      },
      {
        "name": "request",
        "type": "function",
        "description": "Requests access to the specified permissions. These permissions must be defined in the optional_permissions field of the manifest. If there are any problems requesting the permissions, $(ref:runtime.lastError) will be set.",
        "parameters": [
          {
            "name": "permissions",
            "$ref": "Permissions"
          },
          {
            "name": "callback",
            "type": "function",
            "optional": true,
            "parameters": [
              {
                "name": "granted",
                "type": "boolean",
                "description": "True if the user granted the specified permissions."
              }
            ]
          }
        ]
      },
      {
        "name": "remove",
        "type": "function",
        "description": "Removes access to the specified permissions. If there are any problems removing the permissions, $(ref:runtime.lastError) will be set.",
        "parameters": [
          {
            "name": "permissions",
            "$ref": "Permissions"
          },
          {
            "name": "callback",
            "type": "function",
            "optional": true,
            "parameters": [
              {
                "name": "removed",
                "type": "boolean",
                "description": "True if the permissions were removed."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "types": [
      {
        "id": "Level",
        "type": "string",
        "enum": [
          "system",
          "display"
        ]
      }
    ],
    "functions": [
      {
        "name": "requestKeepAwake",
        "type": "function",
        "parameters": [
          {
            "$ref": "Level",
            "optional": false,
            "name": "level"
          }
        ],
        "static": true
      },
      {
        "name": "releaseKeepAwake",
        "type": "function",
        "static": true
      }
    ],
    "namespace": "power",
    "dependencies": [
      "permission:power"
    ]
  },
  {
    "types": [
      {
        "id": "PrintError",
        "type": "string",
        "enum": [
          "OK",
          "FAILED",
          "INVALID_TICKET",
          "INVALID_DATA"
        ]
      },
      {
        "id": "PrinterInfo",
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string",
            "nullable": true
          }
        }
      },
      {
        "id": "PrintJob",
        "type": "object",
        "properties": {
          "printerId": {
            "type": "string"
          },
          "title": {
            "type": "string"
          },
          "ticket": {
            "type": "object"
          },
          "contentType": {
            "type": "string"
          },
          "document": {
            "type": "object"
          }
        }
      }
    ],
    "events": [
      {
        "name": "onGetPrintersRequested",
        "type": "function",
        "parameters": [
          {
            "optional": false,
            "name": "resultCallback",
            "type": "function",
            "parameters": [
              {
                "type": "array",
                "items": {
                  "$ref": "PrinterInfo"
                },
                "optional": false,
                "name": "printerInfo"
              }
            ]
          }
        ]
      },
      {
        "name": "onGetUsbPrinterInfoRequested",
        "type": "function",
        "parameters": [
          {
            "$ref": "Device",
            "optional": false,
            "name": "device"
          },
          {
            "optional": false,
            "name": "resultCallback",
            "type": "function",
            "parameters": [
              {
                "$ref": "PrinterInfo",
                "optional": true,
                "name": "printerInfo"
              }
            ]
          }
        ]
      },
      {
        "name": "onGetCapabilityRequested",
        "type": "function",
        "parameters": [
          {
            "type": "string",
            "optional": false,
            "name": "printerId"
          },
          {
            "optional": false,
            "name": "resultCallback",
            "type": "function",
            "parameters": [
              {
                "type": "object",
                "optional": false,
                "name": "capabilities"
              }
            ]
          }
        ]
      },
      {
        "name": "onPrintRequested",
        "type": "function",
        "parameters": [
          {
            "$ref": "PrintJob",
            "optional": false,
            "name": "printJob"
          },
          {
            "optional": false,
            "name": "resultCallback",
            "type": "function",
            "parameters": [
              {
                "$ref": "PrintError",
                "optional": false,
                "name": "result"
              }
            ]
          }
        ]
      }
    ],
    "namespace": "printerProvider",
    "dependencies": [
      "permission:printerProvider"
    ]
  },
  {
    "namespace": "privacy",
    "description": "Use the <code>chrome.privacy</code> API to control usage of the features in Chrome that can affect a user's privacy. This API relies on the <a href='types#ChromeSetting'>ChromeSetting prototype of the type API</a> for getting and setting Chrome's configuration.",
    "types": [
      {
        "id": "IPHandlingPolicy",
        "type": "string",
        "enum": [
          "default",
          "default_public_and_private_interfaces",
          "default_public_interface_only",
          "disable_non_proxied_udp"
        ],
        "description": "The IP handling policy of WebRTC."
      }
    ],
    "properties": {
      "network": {
        "type": "object",
        "value": {},
        "description": "Settings that influence Chrome's handling of network connections in general.",
        "properties": {
          "networkPredictionEnabled": {
            "$ref": "types.ChromeSetting",
            "value": [
              "networkPredictionEnabled",
              {
                "type": "boolean"
              }
            ],
            "description": "If enabled, Chrome attempts to speed up your web browsing experience by pre-resolving DNS entries, prerendering sites (<code>&lt;link rel='prefetch' ...&gt;</code>), and preemptively opening TCP and SSL connections to servers.  This preference's value is a boolean, defaulting to <code>true</code>."
          },
          "webRTCMultipleRoutesEnabled": {
            "$ref": "types.ChromeSetting",
            "value": [
              "webRTCMultipleRoutesEnabled",
              {
                "type": "boolean"
              }
            ],
            "deprecated": "Please use privacy.network.webRTCIPHandlingPolicy. This remains for backward compatibility in this release and will be removed in the future.",
            "description": "If enabled, Chrome will explore all possible routing options when using WebRTC to find the most performant path, possibly exposing user's private IP address. Otherwise, WebRTC traffic will be routed the same way as regular HTTP. This preference's value is a boolean, defaulting to <code>true</code>."
          },
          "webRTCNonProxiedUdpEnabled": {
            "$ref": "types.ChromeSetting",
            "value": [
              "webRTCNonProxiedUdpEnabled",
              {
                "type": "boolean"
              }
            ],
            "deprecated": "Please use privacy.network.webRTCIPHandlingPolicy. This remains for backward compatibility in this release and will be removed in the future.",
            "description": "If enabled, Chrome is allowed to use non-proxied UDP to connect to peers or TURN servers when using WebRTC. Since most proxy servers don't handle UDP, using UDP possibly exposes user's IP address. Turning this off effectively forces WebRTC to only use TCP for now, until UDP proxy support is available in Chrome and such proxies are widely deployed. As a result, it also might hurt media performance and increase the load for proxy servers. This preference's value is a boolean, defaulting to <code>true</code>."
          },
          "webRTCIPHandlingPolicy": {
            "$ref": "types.ChromeSetting",
            "value": [
              "webRTCIPHandlingPolicy",
              {
                "$ref": "IPHandlingPolicy"
              }
            ],
            "description": "Allow users to specify the media performance/privacy tradeoffs which impacts how WebRTC traffic will be routed and how much local address information is exposed. This preference's value is of type IPHandlingPolicy, defaulting to <code>default</code>."
          }
        }
      },
      "services": {
        "type": "object",
        "value": {},
        "description": "Settings that enable or disable features that require third-party network services provided by Google and your default search provider.",
        "properties": {
          "alternateErrorPagesEnabled": {
            "$ref": "types.ChromeSetting",
            "value": [
              "alternateErrorPagesEnabled",
              {
                "type": "boolean"
              }
            ],
            "description": "If enabled, Chrome uses a web service to help resolve navigation errors. This preference's value is a boolean, defaulting to <code>true</code>."
          },
          "autofillEnabled": {
            "$ref": "types.ChromeSetting",
            "value": [
              "autofillEnabled",
              {
                "type": "boolean"
              }
            ],
            "description": "If enabled, Chrome offers to automatically fill in forms. This preference's value is a boolean, defaulting to <code>true</code>."
          },
          "hotwordSearchEnabled": {
            "$ref": "types.ChromeSetting",
            "value": [
              "hotwordSearchEnabled",
              {
                "type": "boolean"
              }
            ],
            "description": "If enabled, Chrome will enable 'OK, Google' to start a voice search. This preference's value is a boolean, defaulting to <code>true</code>."
          },
          "passwordSavingEnabled": {
            "$ref": "types.ChromeSetting",
            "value": [
              "passwordSavingEnabled",
              {
                "type": "boolean"
              }
            ],
            "description": "If enabled, the password manager will ask if you want to save passwords. This preference's value is a boolean, defaulting to <code>true</code>."
          },
          "safeBrowsingEnabled": {
            "$ref": "types.ChromeSetting",
            "value": [
              "safeBrowsingEnabled",
              {
                "type": "boolean"
              }
            ],
            "description": "If enabled, Chrome does its best to protect you from phishing and malware. This preference's value is a boolean, defaulting to <code>true</code>."
          },
          "safeBrowsingExtendedReportingEnabled": {
            "$ref": "types.ChromeSetting",
            "value": [
              "safeBrowsingExtendedReportingEnabled",
              {
                "type": "boolean"
              }
            ],
            "description": "If enabled, Chrome will send additional information to Google when SafeBrowsing blocks a page, such as the content of the blocked page. This preference's value is a boolean, defaulting to <code>false</code>."
          },
          "searchSuggestEnabled": {
            "$ref": "types.ChromeSetting",
            "value": [
              "searchSuggestEnabled",
              {
                "type": "boolean"
              }
            ],
            "description": "If enabled, Chrome sends the text you type into the Omnibox to your default search engine, which provides predictions of websites and searches that are likely completions of what you've typed so far. This preference's value is a boolean, defaulting to <code>true</code>."
          },
          "spellingServiceEnabled": {
            "$ref": "types.ChromeSetting",
            "value": [
              "spellingServiceEnabled",
              {
                "type": "boolean"
              }
            ],
            "description": "If enabled, Chrome uses a web service to help correct spelling errors. This preference's value is a boolean, defaulting to <code>false</code>."
          },
          "translationServiceEnabled": {
            "$ref": "types.ChromeSetting",
            "value": [
              "translationServiceEnabled",
              {
                "type": "boolean"
              }
            ],
            "description": "If enabled, Chrome offers to translate pages that aren't in a language you read. This preference's value is a boolean, defaulting to <code>true</code>."
          }
        }
      },
      "websites": {
        "type": "object",
        "value": {},
        "description": "Settings that determine what information Chrome makes available to websites.",
        "properties": {
          "thirdPartyCookiesAllowed": {
            "$ref": "types.ChromeSetting",
            "value": [
              "thirdPartyCookiesAllowed",
              {
                "type": "boolean"
              }
            ],
            "description": "If disabled, Chrome blocks third-party sites from setting cookies. The value of this preference is of type boolean, and the default value is <code>true</code>."
          },
          "hyperlinkAuditingEnabled": {
            "$ref": "types.ChromeSetting",
            "value": [
              "hyperlinkAuditingEnabled",
              {
                "type": "boolean"
              }
            ],
            "description": "If enabled, Chrome sends auditing pings when requested by a website (<code>&lt;a ping&gt;</code>). The value of this preference is of type boolean, and the default value is <code>true</code>."
          },
          "referrersEnabled": {
            "$ref": "types.ChromeSetting",
            "value": [
              "referrersEnabled",
              {
                "type": "boolean"
              }
            ],
            "description": "If enabled, Chrome sends <code>referer</code> headers with your requests. Yes, the name of this preference doesn't match the misspelled header. No, we're not going to change it. The value of this preference is of type boolean, and the default value is <code>true</code>."
          },
          "protectedContentEnabled": {
            "$ref": "types.ChromeSetting",
            "value": [
              "protectedContentEnabled",
              {
                "type": "boolean"
              }
            ],
            "description": "<strong>Available on Windows and ChromeOS only</strong>: If enabled, Chrome provides a unique ID to plugins in order to run protected content. The value of this preference is of type boolean, and the default value is <code>true</code>.",
            "platforms": [
              "windows",
              "cros",
              "cros touch"
            ]
          }
        }
      }
    },
    "dependencies": [
      "permission:privacy"
    ]
  },
  {
    "namespace": "proxy",
    "description": "Use the <code>chrome.proxy</code> API to manage Chrome's proxy settings. This API relies on the <a href='types#ChromeSetting'>ChromeSetting prototype of the type API</a> for getting and setting the proxy configuration.",
    "types": [
      {
        "id": "Scheme",
        "type": "string",
        "enum": [
          "http",
          "https",
          "quic",
          "socks4",
          "socks5"
        ]
      },
      {
        "id": "Mode",
        "type": "string",
        "enum": [
          "direct",
          "auto_detect",
          "pac_script",
          "fixed_servers",
          "system"
        ]
      },
      {
        "id": "ProxyServer",
        "type": "object",
        "description": "An object encapsulating a single proxy server's specification.",
        "properties": {
          "scheme": {
            "$ref": "Scheme",
            "optional": true,
            "description": "The scheme (protocol) of the proxy server itself. Defaults to 'http'."
          },
          "host": {
            "type": "string",
            "description": "The URI of the proxy server. This must be an ASCII hostname (in Punycode format). IDNA is not supported, yet."
          },
          "port": {
            "type": "integer",
            "optional": true,
            "description": "The port of the proxy server. Defaults to a port that depends on the scheme."
          }
        }
      },
      {
        "id": "ProxyRules",
        "type": "object",
        "description": "An object encapsulating the set of proxy rules for all protocols. Use either 'singleProxy' or (a subset of) 'proxyForHttp', 'proxyForHttps', 'proxyForFtp' and 'fallbackProxy'.",
        "properties": {
          "singleProxy": {
            "$ref": "ProxyServer",
            "optional": true,
            "description": "The proxy server to be used for all per-URL requests (that is http, https, and ftp)."
          },
          "proxyForHttp": {
            "$ref": "ProxyServer",
            "optional": true,
            "description": "The proxy server to be used for HTTP requests."
          },
          "proxyForHttps": {
            "$ref": "ProxyServer",
            "optional": true,
            "description": "The proxy server to be used for HTTPS requests."
          },
          "proxyForFtp": {
            "$ref": "ProxyServer",
            "optional": true,
            "description": "The proxy server to be used for FTP requests."
          },
          "fallbackProxy": {
            "$ref": "ProxyServer",
            "optional": true,
            "description": "The proxy server to be used for everthing else or if any of the specific proxyFor... is not specified."
          },
          "bypassList": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "optional": true,
            "description": "List of servers to connect to without a proxy server."
          }
        }
      },
      {
        "id": "PacScript",
        "type": "object",
        "description": "An object holding proxy auto-config information. Exactly one of the fields should be non-empty.",
        "properties": {
          "url": {
            "type": "string",
            "optional": true,
            "description": "URL of the PAC file to be used."
          },
          "data": {
            "type": "string",
            "optional": true,
            "description": "A PAC script."
          },
          "mandatory": {
            "type": "boolean",
            "optional": true,
            "description": "If true, an invalid PAC script will prevent the network stack from falling back to direct connections. Defaults to false."
          }
        }
      },
      {
        "id": "ProxyConfig",
        "type": "object",
        "description": "An object encapsulating a complete proxy configuration.",
        "properties": {
          "rules": {
            "$ref": "ProxyRules",
            "optional": true,
            "description": "The proxy rules describing this configuration. Use this for 'fixed_servers' mode."
          },
          "pacScript": {
            "$ref": "PacScript",
            "optional": true,
            "description": "The proxy auto-config (PAC) script for this configuration. Use this for 'pac_script' mode."
          },
          "mode": {
            "$ref": "Mode",
            "description": "'direct' = Never use a proxy<br>'auto_detect' = Auto detect proxy settings<br>'pac_script' = Use specified PAC script<br>'fixed_servers' = Manually specify proxy servers<br>'system' = Use system proxy settings"
          }
        }
      }
    ],
    "properties": {
      "settings": {
        "$ref": "types.ChromeSetting",
        "description": "Proxy settings to be used. The value of this setting is a ProxyConfig object.",
        "value": [
          "proxy",
          {
            "$ref": "ProxyConfig"
          }
        ]
      }
    },
    "events": [
      {
        "name": "onProxyError",
        "type": "function",
        "description": "Notifies about proxy errors.",
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "properties": {
              "fatal": {
                "type": "boolean",
                "description": "If true, the error was fatal and the network transaction was aborted. Otherwise, a direct connection is used instead."
              },
              "error": {
                "type": "string",
                "description": "The error description."
              },
              "details": {
                "type": "string",
                "description": "Additional details about the error such as a JavaScript runtime error."
              }
            }
          }
        ]
      }
    ],
    "dependencies": [
      "permission:proxy"
    ]
  },
  {
    "namespace": "runtime",
    "description": "Use the <code>chrome.runtime</code> API to retrieve the background page, return details about the manifest, and listen for and respond to events in the app or extension lifecycle. You can also use this API to convert the relative path of URLs to fully-qualified URLs.",
    "types": [
      {
        "id": "Port",
        "type": "object",
        "nocompile": true,
        "description": "An object which allows two way communication with other pages. See <a href=\"messaging#connect\">Long-lived connections</a> for more information.",
        "properties": {
          "name": {
            "type": "string",
            "description": "The name of the port, as specified in the call to $(ref:runtime.connect)."
          },
          "disconnect": {
            "type": "function",
            "description": "Immediately disconnect the port. Calling <code>disconnect()</code> on an already-disconnected port has no effect. When a port is disconnected, no new events will be dispatched to this port."
          },
          "onDisconnect": {
            "$ref": "events.Event",
            "description": "Fired when the port is disconnected from the other end(s). $(ref:runtime.lastError) may be set if the port was disconnected by an error. If the port is closed via $(ref:Port.disconnect disconnect), then this event is <em>only</em> fired on the other end. This event is fired at most once (see also <a href=\"messaging#port-lifetime\">Port lifetime</a>). The first and only parameter to the event handler is this disconnected port."
          },
          "onMessage": {
            "$ref": "events.Event",
            "description": "This event is fired when $(ref:Port.postMessage postMessage) is called by the other end of the port. The first parameter is the message, the second parameter is the port that received the message."
          },
          "postMessage": {
            "type": "function",
            "description": "Send a message to the other end of the port. If the port is disconnected, an error is thrown.",
            "parameters": [
              {
                "name": "message",
                "type": "any",
                "description": "The message to send. This object should be JSON-ifiable."
              }
            ]
          },
          "sender": {
            "$ref": "MessageSender",
            "optional": true,
            "description": "This property will <b>only</b> be present on ports passed to $(ref:runtime.onConnect onConnect) / $(ref:runtime.onConnectExternal onConnectExternal) listeners."
          }
        },
        "additionalProperties": {
          "type": "any"
        }
      },
      {
        "id": "MessageSender",
        "type": "object",
        "nocompile": true,
        "description": "An object containing information about the script context that sent a message or request.",
        "properties": {
          "tab": {
            "$ref": "tabs.Tab",
            "optional": true,
            "description": "The $(ref:tabs.Tab) which opened the connection, if any. This property will <strong>only</strong> be present when the connection was opened from a tab (including content scripts), and <strong>only</strong> if the receiver is an extension, not an app.",
            "extension_types": [
              "extension",
              "legacy_packaged_app"
            ]
          },
          "frameId": {
            "type": "integer",
            "optional": true,
            "description": "The <a href='webNavigation#frame_ids'>frame</a> that opened the connection. 0 for top-level frames, positive for child frames. This will only be set when <code>tab</code> is set.",
            "extension_types": [
              "extension",
              "legacy_packaged_app"
            ]
          },
          "guestProcessId": {
            "type": "integer",
            "optional": true,
            "nodoc": true,
            "description": "The guest process id of the requesting webview, if available. Only available for component extensions.",
            "extension_types": [
              "extension"
            ]
          },
          "guestRenderFrameRoutingId": {
            "type": "integer",
            "optional": true,
            "nodoc": true,
            "description": "The guest render frame routing id of the requesting webview, if available. Only available for component extensions.",
            "extension_types": [
              "extension"
            ]
          },
          "id": {
            "type": "string",
            "optional": true,
            "description": "The ID of the extension or app that opened the connection, if any."
          },
          "url": {
            "type": "string",
            "optional": true,
            "description": "The URL of the page or frame that opened the connection. If the sender is in an iframe, it will be iframe's URL not the URL of the page which hosts it."
          },
          "tlsChannelId": {
            "type": "string",
            "optional": true,
            "description": "The TLS channel ID of the page or frame that opened the connection, if requested by the extension or app, and if available."
          }
        }
      },
      {
        "id": "PlatformOs",
        "type": "string",
        "description": "The operating system chrome is running on.",
        "enum": [
          "mac",
          "win",
          "android",
          "cros",
          "linux",
          "openbsd"
        ]
      },
      {
        "id": "PlatformArch",
        "type": "string",
        "enum": [
          "arm",
          "x86-32",
          "x86-64"
        ],
        "description": "The machine's processor architecture."
      },
      {
        "id": "PlatformNaclArch",
        "description": "The native client architecture. This may be different from arch on some platforms.",
        "type": "string",
        "enum": [
          "arm",
          "x86-32",
          "x86-64"
        ]
      },
      {
        "id": "PlatformInfo",
        "type": "object",
        "description": "An object containing information about the current platform.",
        "properties": {
          "os": {
            "$ref": "PlatformOs",
            "description": "The operating system chrome is running on."
          },
          "arch": {
            "$ref": "PlatformArch",
            "description": "The machine's processor architecture."
          },
          "nacl_arch": {
            "description": "The native client architecture. This may be different from arch on some platforms.",
            "$ref": "PlatformNaclArch"
          }
        }
      },
      {
        "id": "RequestUpdateCheckStatus",
        "type": "string",
        "enum": [
          "throttled",
          "no_update",
          "update_available"
        ],
        "description": "Result of the update check."
      },
      {
        "id": "OnInstalledReason",
        "type": "string",
        "enum": [
          "install",
          "update",
          "chrome_update",
          "shared_module_update"
        ],
        "description": "The reason that this event is being dispatched."
      },
      {
        "id": "OnRestartRequiredReason",
        "type": "string",
        "description": "The reason that the event is being dispatched. 'app_update' is used when the restart is needed because the application is updated to a newer version. 'os_update' is used when the restart is needed because the browser/OS is updated to a newer version. 'periodic' is used when the system runs for more than the permitted uptime set in the enterprise policy.",
        "enum": [
          "app_update",
          "os_update",
          "periodic"
        ]
      }
    ],
    "properties": {
      "lastError": {
        "type": "object",
        "optional": true,
        "description": "This will be defined during an API method callback if there was an error",
        "properties": {
          "message": {
            "optional": true,
            "type": "string",
            "description": "Details about the error which occurred."
          }
        }
      },
      "id": {
        "type": "string",
        "description": "The ID of the extension/app."
      }
    },
    "functions": [
      {
        "name": "getBackgroundPage",
        "type": "function",
        "description": "Retrieves the JavaScript 'window' object for the background page running inside the current extension/app. If the background page is an event page, the system will ensure it is loaded before calling the callback. If there is no background page, an error is set.",
        "parameters": [
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "backgroundPage",
                "optional": true,
                "type": "object",
                "isInstanceOf": "Window",
                "additionalProperties": {
                  "type": "any"
                },
                "description": "The JavaScript 'window' object for the background page."
              }
            ]
          }
        ]
      },
      {
        "name": "openOptionsPage",
        "type": "function",
        "description": "<p>Open your Extension's options page, if possible.</p><p>The precise behavior may depend on your manifest's <code><a href=\"optionsV2\">options_ui</a></code> or <code><a href=\"options\">options_page</a></code> key, or what Chrome happens to support at the time. For example, the page may be opened in a new tab, within chrome://extensions, within an App, or it may just focus an open options page. It will never cause the caller page to reload.</p><p>If your Extension does not declare an options page, or Chrome failed to create one for some other reason, the callback will set $(ref:lastError).</p>",
        "parameters": [
          {
            "type": "function",
            "name": "callback",
            "parameters": [],
            "optional": true
          }
        ]
      },
      {
        "name": "getManifest",
        "description": "Returns details about the app or extension from the manifest. The object returned is a serialization of the full <a href=\"manifest.html\">manifest file</a>.",
        "type": "function",
        "nocompile": true,
        "parameters": [],
        "returns": {
          "type": "object",
          "properties": {},
          "additionalProperties": {
            "type": "any"
          },
          "description": "The manifest details."
        },
        "content_script": true
      },
      {
        "name": "getURL",
        "type": "function",
        "nocompile": true,
        "description": "Converts a relative path within an app/extension install directory to a fully-qualified URL.",
        "parameters": [
          {
            "type": "string",
            "name": "path",
            "description": "A path to a resource within an app/extension expressed relative to its install directory."
          }
        ],
        "returns": {
          "type": "string",
          "description": "The fully-qualified URL to the resource."
        },
        "content_script": true
      },
      {
        "name": "setUninstallURL",
        "type": "function",
        "description": "Sets the URL to be visited upon uninstallation. This may be used to clean up server-side data, do analytics, and implement surveys. Maximum 255 characters.",
        "parameters": [
          {
            "type": "string",
            "name": "url",
            "maxLength": 255,
            "description": "URL to be opened after the extension is uninstalled. This URL must have an http: or https: scheme. Set an empty string to not open a new tab upon uninstallation."
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "description": "Called when the uninstall URL is set. If the given URL is invalid, $(ref:runtime.lastError) will be set.",
            "parameters": []
          }
        ]
      },
      {
        "name": "reload",
        "description": "Reloads the app or extension. This method is not supported in kiosk mode. For kiosk mode, use chrome.runtime.restart() method.",
        "type": "function",
        "parameters": []
      },
      {
        "name": "requestUpdateCheck",
        "type": "function",
        "description": "<p>Requests an immediate update check be done for this app/extension.</p> <p><b>Important</b>: Most extensions/apps should <b>not</b> use this method, since chrome already does automatic checks every few hours, and you can listen for the $(ref:runtime.onUpdateAvailable) event without needing to call requestUpdateCheck.</p><p>This method is only appropriate to call in very limited circumstances, such as if your extension/app talks to a backend service, and the backend service has determined that the client extension/app version is very far out of date and you'd like to prompt a user to update. Most other uses of requestUpdateCheck, such as calling it unconditionally based on a repeating timer, probably only serve to waste client, network, and server resources.</p>",
        "parameters": [
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "status",
                "$ref": "RequestUpdateCheckStatus",
                "description": "Result of the update check."
              },
              {
                "name": "details",
                "type": "object",
                "optional": true,
                "properties": {
                  "version": {
                    "type": "string",
                    "description": "The version of the available update."
                  }
                },
                "description": "If an update is available, this contains more information about the available update."
              }
            ]
          }
        ]
      },
      {
        "name": "restart",
        "description": "Restart the ChromeOS device when the app runs in kiosk mode. Otherwise, it's no-op.",
        "type": "function",
        "parameters": []
      },
      {
        "name": "restartAfterDelay",
        "description": "Restart the ChromeOS device when the app runs in kiosk mode after the given seconds. If called again before the time ends, the reboot will be delayed. If called with a value of -1, the reboot will be cancelled. It's a no-op in non-kiosk mode. It's only allowed to be called repeatedly by the first extension to invoke this API.",
        "type": "function",
        "parameters": [
          {
            "type": "integer",
            "name": "seconds",
            "description": "Time to wait in seconds before rebooting the device, or -1 to cancel a scheduled reboot."
          },
          {
            "type": "function",
            "name": "callback",
            "description": "A callback to be invoked when a restart request was successfully rescheduled.",
            "optional": true
          }
        ]
      },
      {
        "name": "connect",
        "type": "function",
        "nocompile": true,
        "description": "Attempts to connect to connect listeners within an extension/app (such as the background page), or other extensions/apps. This is useful for content scripts connecting to their extension processes, inter-app/extension communication, and <a href=\"manifest/externally_connectable.html\">web messaging</a>. Note that this does not connect to any listeners in a content script. Extensions may connect to content scripts embedded in tabs via $(ref:tabs.connect).",
        "parameters": [
          {
            "type": "string",
            "name": "extensionId",
            "optional": true,
            "description": "The ID of the extension or app to connect to. If omitted, a connection will be attempted with your own extension. Required if sending messages from a web page for <a href=\"manifest/externally_connectable.html\">web messaging</a>."
          },
          {
            "type": "object",
            "name": "connectInfo",
            "properties": {
              "name": {
                "type": "string",
                "optional": true,
                "description": "Will be passed into onConnect for processes that are listening for the connection event."
              },
              "includeTlsChannelId": {
                "type": "boolean",
                "optional": true,
                "description": "Whether the TLS channel ID will be passed into onConnectExternal for processes that are listening for the connection event."
              }
            },
            "optional": true
          }
        ],
        "returns": {
          "$ref": "Port",
          "description": "Port through which messages can be sent and received. The port's $(ref:Port onDisconnect) event is fired if the extension/app does not exist. "
        },
        "content_script": true
      },
      {
        "name": "connectNative",
        "type": "function",
        "nocompile": true,
        "description": "Connects to a native application in the host machine. See <a href=\"nativeMessaging\">Native Messaging</a> for more information.",
        "parameters": [
          {
            "type": "string",
            "name": "application",
            "description": "The name of the registered application to connect to."
          }
        ],
        "returns": {
          "$ref": "Port",
          "description": "Port through which messages can be sent and received with the application"
        },
        "dependencies": [
          "permission:nativeMessaging"
        ]
      },
      {
        "name": "sendMessage",
        "type": "function",
        "nocompile": true,
        "allowAmbiguousOptionalArguments": true,
        "description": "Sends a single message to event listeners within your extension/app or a different extension/app. Similar to $(ref:runtime.connect) but only sends a single message, with an optional response. If sending to your extension, the $(ref:runtime.onMessage) event will be fired in every frame of your extension (except for the sender's frame), or $(ref:runtime.onMessageExternal), if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use $(ref:tabs.sendMessage).",
        "parameters": [
          {
            "type": "string",
            "name": "extensionId",
            "optional": true,
            "description": "The ID of the extension/app to send the message to. If omitted, the message will be sent to your own extension/app. Required if sending messages from a web page for <a href=\"manifest/externally_connectable.html\">web messaging</a>."
          },
          {
            "type": "any",
            "name": "message",
            "description": "The message to send. This message should be a JSON-ifiable object."
          },
          {
            "type": "object",
            "name": "options",
            "properties": {
              "includeTlsChannelId": {
                "type": "boolean",
                "optional": true,
                "description": "Whether the TLS channel ID will be passed into onMessageExternal for processes that are listening for the connection event."
              }
            },
            "optional": true
          },
          {
            "type": "function",
            "name": "responseCallback",
            "optional": true,
            "parameters": [
              {
                "name": "response",
                "type": "any",
                "description": "The JSON response object sent by the handler of the message. If an error occurs while connecting to the extension, the callback will be called with no arguments and $(ref:runtime.lastError) will be set to the error message."
              }
            ]
          }
        ],
        "content_script": true
      },
      {
        "name": "sendNativeMessage",
        "type": "function",
        "nocompile": true,
        "description": "Send a single message to a native application.",
        "parameters": [
          {
            "name": "application",
            "description": "The name of the native messaging host.",
            "type": "string"
          },
          {
            "name": "message",
            "description": "The message that will be passed to the native messaging host.",
            "type": "object",
            "additionalProperties": {
              "type": "any"
            }
          },
          {
            "type": "function",
            "name": "responseCallback",
            "optional": true,
            "parameters": [
              {
                "name": "response",
                "type": "any",
                "description": "The response message sent by the native messaging host. If an error occurs while connecting to the native messaging host, the callback will be called with no arguments and $(ref:runtime.lastError) will be set to the error message.",
                "additionalProperties": {
                  "type": "any"
                }
              }
            ]
          }
        ],
        "dependencies": [
          "permission:nativeMessaging"
        ]
      },
      {
        "name": "getPlatformInfo",
        "type": "function",
        "description": "Returns information about the current platform.",
        "parameters": [
          {
            "type": "function",
            "name": "callback",
            "description": "Called with results",
            "parameters": [
              {
                "name": "platformInfo",
                "$ref": "PlatformInfo"
              }
            ]
          }
        ]
      },
      {
        "name": "getPackageDirectoryEntry",
        "type": "function",
        "description": "Returns a DirectoryEntry for the package directory.",
        "parameters": [
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "directoryEntry",
                "type": "object",
                "additionalProperties": {
                  "type": "any"
                },
                "isInstanceOf": "DirectoryEntry"
              }
            ]
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onStartup",
        "type": "function",
        "description": "Fired when a profile that has this extension installed first starts up. This event is not fired when an incognito profile is started, even if this extension is operating in 'split' incognito mode."
      },
      {
        "name": "onInstalled",
        "type": "function",
        "description": "Fired when the extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version.",
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "properties": {
              "reason": {
                "$ref": "OnInstalledReason",
                "description": "The reason that this event is being dispatched."
              },
              "previousVersion": {
                "type": "string",
                "optional": true,
                "description": "Indicates the previous version of the extension, which has just been updated. This is present only if 'reason' is 'update'."
              },
              "id": {
                "type": "string",
                "optional": true,
                "description": "Indicates the ID of the imported shared module extension which updated. This is present only if 'reason' is 'shared_module_update'."
              }
            }
          }
        ]
      },
      {
        "name": "onSuspend",
        "type": "function",
        "description": "Sent to the event page just before it is unloaded. This gives the extension opportunity to do some clean up. Note that since the page is unloading, any asynchronous operations started while handling this event are not guaranteed to complete. If more activity for the event page occurs before it gets unloaded the onSuspendCanceled event will be sent and the page won't be unloaded. "
      },
      {
        "name": "onSuspendCanceled",
        "type": "function",
        "description": "Sent after onSuspend to indicate that the app won't be unloaded after all."
      },
      {
        "name": "onUpdateAvailable",
        "type": "function",
        "description": "Fired when an update is available, but isn't installed immediately because the app is currently running. If you do nothing, the update will be installed the next time the background page gets unloaded, if you want it to be installed sooner you can explicitly call chrome.runtime.reload(). If your extension is using a persistent background page, the background page of course never gets unloaded, so unless you call chrome.runtime.reload() manually in response to this event the update will not get installed until the next time chrome itself restarts. If no handlers are listening for this event, and your extension has a persistent background page, it behaves as if chrome.runtime.reload() is called in response to this event.",
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "properties": {
              "version": {
                "type": "string",
                "description": "The version number of the available update."
              }
            },
            "additionalProperties": {
              "type": "any"
            },
            "description": "The manifest details of the available update."
          }
        ]
      },
      {
        "name": "onBrowserUpdateAvailable",
        "type": "function",
        "description": "Fired when a Chrome update is available, but isn't installed immediately because a browser restart is required.",
        "deprecated": "Please use $(ref:runtime.onRestartRequired).",
        "parameters": []
      },
      {
        "name": "onConnect",
        "type": "function",
        "nocompile": true,
        "options": {
          "unmanaged": true
        },
        "description": "Fired when a connection is made from either an extension process or a content script (by $(ref:runtime.connect)).",
        "parameters": [
          {
            "$ref": "Port",
            "name": "port"
          }
        ]
      },
      {
        "name": "onConnectExternal",
        "type": "function",
        "nocompile": true,
        "description": "Fired when a connection is made from another extension (by $(ref:runtime.connect)).",
        "parameters": [
          {
            "$ref": "Port",
            "name": "port"
          }
        ]
      },
      {
        "name": "onMessage",
        "type": "function",
        "nocompile": true,
        "options": {
          "unmanaged": true
        },
        "description": "Fired when a message is sent from either an extension process (by $(ref:runtime.sendMessage)) or a content script (by $(ref:tabs.sendMessage)).",
        "parameters": [
          {
            "name": "message",
            "type": "any",
            "optional": true,
            "description": "The message sent by the calling script."
          },
          {
            "name": "sender",
            "$ref": "MessageSender"
          },
          {
            "name": "sendResponse",
            "type": "function",
            "description": "Function to call (at most once) when you have a response. The argument should be any JSON-ifiable object. If you have more than one <code>onMessage</code> listener in the same document, then only one may send a response. This function becomes invalid when the event listener returns, <strong>unless you return true</strong> from the event listener to indicate you wish to send a response asynchronously (this will keep the message channel open to the other end until <code>sendResponse</code> is called)."
          }
        ],
        "returns": {
          "type": "boolean",
          "optional": true,
          "description": "Return true from the event listener if you wish to call <code>sendResponse</code> after the event listener returns."
        }
      },
      {
        "name": "onMessageExternal",
        "type": "function",
        "nocompile": true,
        "description": "Fired when a message is sent from another extension/app (by $(ref:runtime.sendMessage)). Cannot be used in a content script.",
        "parameters": [
          {
            "name": "message",
            "type": "any",
            "optional": true,
            "description": "The message sent by the calling script."
          },
          {
            "name": "sender",
            "$ref": "MessageSender"
          },
          {
            "name": "sendResponse",
            "type": "function",
            "description": "Function to call (at most once) when you have a response. The argument should be any JSON-ifiable object. If you have more than one <code>onMessage</code> listener in the same document, then only one may send a response. This function becomes invalid when the event listener returns, <strong>unless you return true</strong> from the event listener to indicate you wish to send a response asynchronously (this will keep the message channel open to the other end until <code>sendResponse</code> is called)."
          }
        ],
        "returns": {
          "type": "boolean",
          "optional": true,
          "description": "Return true from the event listener if you wish to call <code>sendResponse</code> after the event listener returns."
        }
      },
      {
        "name": "onRestartRequired",
        "type": "function",
        "description": "Fired when an app or the device that it runs on needs to be restarted. The app should close all its windows at its earliest convenient time to let the restart to happen. If the app does nothing, a restart will be enforced after a 24-hour grace period has passed. Currently, this event is only fired for Chrome OS kiosk apps.",
        "parameters": [
          {
            "$ref": "OnRestartRequiredReason",
            "name": "reason",
            "description": "The reason that the event is being dispatched."
          }
        ]
      }
    ]
  },
  {
    "namespace": "sessions",
    "description": "Use the <code>chrome.sessions</code> API to query and restore tabs and windows from a browsing session.",
    "types": [
      {
        "id": "Filter",
        "type": "object",
        "properties": {
          "maxResults": {
            "type": "integer",
            "minimum": 0,
            "maximum": 25,
            "optional": true,
            "description": "The maximum number of entries to be fetched in the requested list. Omit this parameter to fetch the maximum number of entries ($(ref:sessions.MAX_SESSION_RESULTS))."
          }
        }
      },
      {
        "id": "Session",
        "type": "object",
        "properties": {
          "lastModified": {
            "type": "integer",
            "description": "The time when the window or tab was closed or modified, represented in milliseconds since the epoch."
          },
          "tab": {
            "$ref": "tabs.Tab",
            "optional": true,
            "description": "The $(ref:tabs.Tab), if this entry describes a tab. Either this or $(ref:sessions.Session.window) will be set."
          },
          "window": {
            "$ref": "windows.Window",
            "optional": true,
            "description": "The $(ref:windows.Window), if this entry describes a window. Either this or $(ref:sessions.Session.tab) will be set."
          }
        }
      },
      {
        "id": "Device",
        "type": "object",
        "properties": {
          "info": {
            "type": "string",
            "nodoc": true
          },
          "deviceName": {
            "type": "string",
            "description": "The name of the foreign device."
          },
          "sessions": {
            "type": "array",
            "items": {
              "$ref": "Session"
            },
            "description": "A list of open window sessions for the foreign device, sorted from most recently to least recently modified session."
          }
        }
      }
    ],
    "functions": [
      {
        "name": "getRecentlyClosed",
        "type": "function",
        "description": "Gets the list of recently closed tabs and/or windows.",
        "parameters": [
          {
            "$ref": "Filter",
            "name": "filter",
            "optional": true
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "sessions",
                "type": "array",
                "items": {
                  "$ref": "Session"
                },
                "description": "The list of closed entries in reverse order that they were closed (the most recently closed tab or window will be at index <code>0</code>). The entries may contain either tabs or windows."
              }
            ]
          }
        ]
      },
      {
        "name": "getDevices",
        "type": "function",
        "description": "Retrieves all devices with synced sessions.",
        "parameters": [
          {
            "$ref": "Filter",
            "name": "filter",
            "optional": true
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "devices",
                "type": "array",
                "items": {
                  "$ref": "Device"
                },
                "description": "The list of $(ref:sessions.Device) objects for each synced session, sorted in order from device with most recently modified session to device with least recently modified session. $(ref:tabs.Tab) objects are sorted by recency in the $(ref:windows.Window) of the $(ref:sessions.Session) objects."
              }
            ]
          }
        ]
      },
      {
        "name": "restore",
        "type": "function",
        "description": "Reopens a $(ref:windows.Window) or $(ref:tabs.Tab), with an optional callback to run when the entry has been restored.",
        "parameters": [
          {
            "type": "string",
            "name": "sessionId",
            "optional": true,
            "description": "The $(ref:windows.Window.sessionId), or $(ref:tabs.Tab.sessionId) to restore. If this parameter is not specified, the most recently closed session is restored."
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": [
              {
                "$ref": "Session",
                "name": "restoredSession",
                "description": "A $(ref:sessions.Session) containing the restored $(ref:windows.Window) or $(ref:tabs.Tab) object."
              }
            ]
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onChanged",
        "description": "Fired when recently closed tabs and/or windows are changed. This event does not monitor synced sessions changes.",
        "type": "function"
      }
    ],
    "properties": {
      "MAX_SESSION_RESULTS": {
        "value": 25,
        "description": "The maximum number of $(ref:sessions.Session) that will be included in a requested list."
      }
    },
    "dependencies": [
      "permission:sessions"
    ]
  },
  {
    "namespace": "storage",
    "description": "Use the <code>chrome.storage</code> API to store, retrieve, and track changes to user data.",
    "unprivileged": true,
    "types": [
      {
        "id": "StorageChange",
        "type": "object",
        "properties": {
          "oldValue": {
            "type": "any",
            "description": "The old value of the item, if there was an old value.",
            "optional": true
          },
          "newValue": {
            "type": "any",
            "description": "The new value of the item, if there is a new value.",
            "optional": true
          }
        }
      },
      {
        "id": "StorageArea",
        "type": "object",
        "js_module": "StorageArea",
        "functions": [
          {
            "name": "get",
            "type": "function",
            "description": "Gets one or more items from storage.",
            "parameters": [
              {
                "name": "keys",
                "choices": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  {
                    "type": "object",
                    "description": "Storage items to return in the callback, where the values are replaced with those from storage if they exist.",
                    "additionalProperties": {
                      "type": "any"
                    }
                  }
                ],
                "description": "A single key to get, list of keys to get, or a dictionary specifying default values (see description of the object).  An empty list or object will return an empty result object.  Pass in <code>null</code> to get the entire contents of storage.",
                "optional": true
              },
              {
                "name": "callback",
                "type": "function",
                "description": "Callback with storage items, or on failure (in which case $(ref:runtime.lastError) will be set).",
                "parameters": [
                  {
                    "name": "items",
                    "type": "object",
                    "additionalProperties": {
                      "type": "any"
                    },
                    "description": "Object with items in their key-value mappings."
                  }
                ]
              }
            ]
          },
          {
            "name": "getBytesInUse",
            "type": "function",
            "description": "Gets the amount of space (in bytes) being used by one or more items.",
            "parameters": [
              {
                "name": "keys",
                "choices": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                ],
                "description": "A single key or list of keys to get the total usage for. An empty list will return 0. Pass in <code>null</code> to get the total usage of all of storage.",
                "optional": true
              },
              {
                "name": "callback",
                "type": "function",
                "description": "Callback with the amount of space being used by storage, or on failure (in which case $(ref:runtime.lastError) will be set).",
                "parameters": [
                  {
                    "name": "bytesInUse",
                    "type": "integer",
                    "description": "Amount of space being used in storage, in bytes."
                  }
                ]
              }
            ]
          },
          {
            "name": "set",
            "type": "function",
            "description": "Sets multiple items.",
            "parameters": [
              {
                "name": "items",
                "type": "object",
                "additionalProperties": {
                  "type": "any"
                },
                "description": "<p>An object which gives each key/value pair to update storage with. Any other key/value pairs in storage will not be affected.</p><p>Primitive values such as numbers will serialize as expected. Values with a <code>typeof</code> <code>\"object\"</code> and <code>\"function\"</code> will typically serialize to <code>{}</code>, with the exception of <code>Array</code> (serializes as expected), <code>Date</code>, and <code>Regex</code> (serialize using their <code>String</code> representation).</p>"
              },
              {
                "name": "callback",
                "type": "function",
                "description": "Callback on success, or on failure (in which case $(ref:runtime.lastError) will be set).",
                "parameters": [],
                "optional": true
              }
            ]
          },
          {
            "name": "remove",
            "type": "function",
            "description": "Removes one or more items from storage.",
            "parameters": [
              {
                "name": "keys",
                "choices": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                ],
                "description": "A single key or a list of keys for items to remove."
              },
              {
                "name": "callback",
                "type": "function",
                "description": "Callback on success, or on failure (in which case $(ref:runtime.lastError) will be set).",
                "parameters": [],
                "optional": true
              }
            ]
          },
          {
            "name": "clear",
            "type": "function",
            "description": "Removes all items from storage.",
            "parameters": [
              {
                "name": "callback",
                "type": "function",
                "description": "Callback on success, or on failure (in which case $(ref:runtime.lastError) will be set).",
                "parameters": [],
                "optional": true
              }
            ]
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onChanged",
        "type": "function",
        "description": "Fired when one or more items change.",
        "parameters": [
          {
            "name": "changes",
            "type": "object",
            "additionalProperties": {
              "$ref": "StorageChange"
            },
            "description": "Object mapping each key that changed to its corresponding $(ref:storage.StorageChange) for that item."
          },
          {
            "name": "areaName",
            "type": "string",
            "description": "The name of the storage area (<code>\"sync\"</code>, <code>\"local\"</code> or <code>\"managed\"</code>) the changes are for."
          }
        ]
      }
    ],
    "properties": {
      "sync": {
        "$ref": "StorageArea",
        "description": "Items in the <code>sync</code> storage area are synced using Chrome Sync.",
        "value": [
          "sync"
        ],
        "properties": {
          "QUOTA_BYTES": {
            "value": 102400,
            "description": "The maximum total amount (in bytes) of data that can be stored in sync storage, as measured by the JSON stringification of every value plus every key's length. Updates that would cause this limit to be exceeded fail immediately and set $(ref:runtime.lastError)."
          },
          "QUOTA_BYTES_PER_ITEM": {
            "value": 8192,
            "description": "The maximum size (in bytes) of each individual item in sync storage, as measured by the JSON stringification of its value plus its key length. Updates containing items larger than this limit will fail immediately and set $(ref:runtime.lastError)."
          },
          "MAX_ITEMS": {
            "value": 512,
            "description": "The maximum number of items that can be stored in sync storage. Updates that would cause this limit to be exceeded will fail immediately and set $(ref:runtime.lastError)."
          },
          "MAX_WRITE_OPERATIONS_PER_HOUR": {
            "value": 1800,
            "description": "<p>The maximum number of <code>set</code>, <code>remove</code>, or <code>clear</code> operations that can be performed each hour. This is 1 every 2 seconds, a lower ceiling than the short term higher writes-per-minute limit.</p><p>Updates that would cause this limit to be exceeded fail immediately and set $(ref:runtime.lastError).</p>"
          },
          "MAX_WRITE_OPERATIONS_PER_MINUTE": {
            "value": 120,
            "description": "<p>The maximum number of <code>set</code>, <code>remove</code>, or <code>clear</code> operations that can be performed each minute. This is 2 per second, providing higher throughput than writes-per-hour over a shorter period of time.</p><p>Updates that would cause this limit to be exceeded fail immediately and set $(ref:runtime.lastError).</p>"
          },
          "MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE": {
            "value": 1000000,
            "deprecated": "The storage.sync API no longer has a sustained write operation quota.",
            "description": ""
          }
        }
      },
      "local": {
        "$ref": "StorageArea",
        "description": "Items in the <code>local</code> storage area are local to each machine.",
        "value": [
          "local"
        ],
        "properties": {
          "QUOTA_BYTES": {
            "value": 5242880,
            "description": "The maximum amount (in bytes) of data that can be stored in local storage, as measured by the JSON stringification of every value plus every key's length. This value will be ignored if the extension has the <code>unlimitedStorage</code> permission. Updates that would cause this limit to be exceeded fail immediately and set $(ref:runtime.lastError)."
          }
        }
      },
      "managed": {
        "$ref": "StorageArea",
        "description": "Items in the <code>managed</code> storage area are set by the domain administrator, and are read-only for the extension; trying to modify this namespace results in an error.",
        "value": [
          "managed"
        ]
      }
    },
    "content_script": true,
    "dependencies": [
      "permission:storage"
    ]
  },
  {
    "types": [
      {
        "id": "CpuTime",
        "type": "object",
        "properties": {
          "user": {
            "type": "number"
          },
          "kernel": {
            "type": "number"
          },
          "idle": {
            "type": "number"
          },
          "total": {
            "type": "number"
          }
        }
      },
      {
        "id": "ProcessorInfo",
        "type": "object",
        "properties": {
          "usage": {
            "$ref": "CpuTime"
          }
        }
      },
      {
        "id": "CpuInfo",
        "type": "object",
        "properties": {
          "numOfProcessors": {
            "type": "integer"
          },
          "archName": {
            "type": "string"
          },
          "modelName": {
            "type": "string"
          },
          "features": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "processors": {
            "type": "array",
            "items": {
              "$ref": "ProcessorInfo"
            }
          }
        }
      }
    ],
    "functions": [
      {
        "name": "getInfo",
        "type": "function",
        "parameters": [
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "$ref": "CpuInfo",
                "optional": false,
                "name": "info"
              }
            ]
          }
        ],
        "static": true
      }
    ],
    "namespace": "system.cpu",
    "dependencies": [
      "permission:system.cpu"
    ]
  },
  {
    "types": [
      {
        "id": "MemoryInfo",
        "type": "object",
        "properties": {
          "capacity": {
            "type": "number"
          },
          "availableCapacity": {
            "type": "number"
          }
        }
      }
    ],
    "functions": [
      {
        "name": "getInfo",
        "type": "function",
        "parameters": [
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "$ref": "MemoryInfo",
                "optional": false,
                "name": "info"
              }
            ]
          }
        ],
        "static": true
      }
    ],
    "namespace": "system.memory",
    "dependencies": [
      "permission:system.memory"
    ]
  },
  {
    "types": [
      {
        "id": "StorageUnitType",
        "type": "string",
        "enum": [
          "fixed",
          "removable",
          "unknown"
        ]
      },
      {
        "id": "StorageUnitInfo",
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "type": {
            "$ref": "StorageUnitType"
          },
          "capacity": {
            "type": "number"
          }
        }
      },
      {
        "id": "StorageAvailableCapacityInfo",
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "availableCapacity": {
            "type": "number"
          }
        }
      },
      {
        "id": "EjectDeviceResultCode",
        "type": "string",
        "enum": [
          "success",
          "in_use",
          "no_such_device",
          "failure"
        ]
      }
    ],
    "functions": [
      {
        "name": "getInfo",
        "type": "function",
        "parameters": [
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "type": "array",
                "items": {
                  "$ref": "StorageUnitInfo"
                },
                "optional": false,
                "name": "info"
              }
            ]
          }
        ],
        "static": true
      },
      {
        "name": "ejectDevice",
        "type": "function",
        "parameters": [
          {
            "type": "string",
            "optional": false,
            "name": "id"
          },
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "$ref": "EjectDeviceResultCode",
                "optional": false,
                "name": "result"
              }
            ]
          }
        ],
        "static": true
      },
      {
        "name": "getAvailableCapacity",
        "type": "function",
        "parameters": [
          {
            "type": "string",
            "optional": false,
            "name": "id"
          },
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "$ref": "StorageAvailableCapacityInfo",
                "optional": false,
                "name": "info"
              }
            ]
          }
        ],
        "static": true
      }
    ],
    "events": [
      {
        "name": "onAttached",
        "type": "function",
        "parameters": [
          {
            "$ref": "StorageUnitInfo",
            "optional": false,
            "name": "info"
          }
        ]
      },
      {
        "name": "onDetached",
        "type": "function",
        "parameters": [
          {
            "type": "string",
            "optional": false,
            "name": "id"
          }
        ]
      }
    ],
    "namespace": "system.storage",
    "dependencies": [
      "permission:system.storage"
    ]
  },
  {
    "types": [
      {
        "id": "TabCaptureState",
        "type": "string",
        "enum": [
          "pending",
          "active",
          "stopped",
          "error"
        ]
      },
      {
        "id": "CaptureInfo",
        "type": "object",
        "properties": {
          "tabId": {
            "type": "integer"
          },
          "status": {
            "$ref": "TabCaptureState"
          },
          "fullscreen": {
            "type": "boolean"
          }
        }
      },
      {
        "id": "MediaStreamConstraint",
        "type": "object",
        "properties": {
          "mandatory": {
            "type": "object"
          },
          "optional": {
            "type": "object",
            "nullable": true
          }
        }
      },
      {
        "id": "CaptureOptions",
        "type": "object",
        "properties": {
          "audio": {
            "type": "boolean",
            "nullable": true
          },
          "video": {
            "type": "boolean",
            "nullable": true
          },
          "audioConstraints": {
            "$ref": "MediaStreamConstraint",
            "nullable": true
          },
          "videoConstraints": {
            "$ref": "MediaStreamConstraint",
            "nullable": true
          },
          "presentationId": {
            "type": "string",
            "nullable": true
          }
        }
      }
    ],
    "functions": [
      {
        "name": "capture",
        "type": "function",
        "parameters": [
          {
            "$ref": "CaptureOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "type": "object",
                "optional": false,
                "name": "stream"
              }
            ]
          }
        ],
        "static": true
      },
      {
        "name": "getCapturedTabs",
        "type": "function",
        "parameters": [
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "type": "array",
                "items": {
                  "$ref": "CaptureInfo"
                },
                "optional": false,
                "name": "result"
              }
            ]
          }
        ],
        "static": true
      },
      {
        "name": "captureOffscreenTab",
        "type": "function",
        "parameters": [
          {
            "type": "string",
            "optional": false,
            "name": "startUrl"
          },
          {
            "$ref": "CaptureOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "type": "object",
                "optional": false,
                "name": "stream"
              }
            ]
          }
        ],
        "static": true
      }
    ],
    "events": [
      {
        "name": "onStatusChanged",
        "type": "function",
        "parameters": [
          {
            "$ref": "CaptureInfo",
            "optional": false,
            "name": "info"
          }
        ]
      }
    ],
    "namespace": "tabCapture",
    "dependencies": [
      "permission:tabCapture"
    ]
  },
  {
    "namespace": "tabs",
    "description": "Use the <code>chrome.tabs</code> API to interact with the browser's tab system. You can use this API to create, modify, and rearrange tabs in the browser.",
    "types": [
      {
        "id": "MutedInfoReason",
        "type": "string",
        "description": "An event that caused a muted state change.",
        "enum": [
          {
            "name": "user",
            "description": "A user input action has set/overridden the muted state."
          },
          {
            "name": "capture",
            "description": "Tab capture started, forcing a muted state change."
          },
          {
            "name": "extension",
            "description": "An extension, identified by the extensionId field, set the muted state."
          }
        ]
      },
      {
        "id": "MutedInfo",
        "type": "object",
        "description": "Tab muted state and the reason for the last state change.",
        "properties": {
          "muted": {
            "type": "boolean",
            "description": "Whether the tab is prevented from playing sound (but hasn't necessarily recently produced sound). Equivalent to whether the muted audio indicator is showing."
          },
          "reason": {
            "$ref": "MutedInfoReason",
            "optional": true,
            "description": "The reason the tab was muted or unmuted. Not set if the tab's mute state has never been changed."
          },
          "extensionId": {
            "type": "string",
            "optional": true,
            "description": "The ID of the extension that changed the muted state. Not set if an extension was not the reason the muted state last changed."
          }
        }
      },
      {
        "id": "Tab",
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "minimum": -1,
            "optional": true,
            "description": "The ID of the tab. Tab IDs are unique within a browser session. Under some circumstances a Tab may not be assigned an ID, for example when querying foreign tabs using the $(ref:sessions) API, in which case a session ID may be present. Tab ID can also be set to chrome.tabs.TAB_ID_NONE for apps and devtools windows."
          },
          "index": {
            "type": "integer",
            "minimum": -1,
            "description": "The zero-based index of the tab within its window."
          },
          "windowId": {
            "type": "integer",
            "minimum": 0,
            "description": "The ID of the window the tab is contained within."
          },
          "openerTabId": {
            "type": "integer",
            "minimum": 0,
            "optional": true,
            "description": "The ID of the tab that opened this tab, if any. This property is only present if the opener tab still exists."
          },
          "selected": {
            "type": "boolean",
            "description": "Whether the tab is selected.",
            "deprecated": "Please use $(ref:tabs.Tab.highlighted)."
          },
          "highlighted": {
            "type": "boolean",
            "description": "Whether the tab is highlighted."
          },
          "active": {
            "type": "boolean",
            "description": "Whether the tab is active in its window. (Does not necessarily mean the window is focused.)"
          },
          "pinned": {
            "type": "boolean",
            "description": "Whether the tab is pinned."
          },
          "audible": {
            "type": "boolean",
            "optional": true,
            "description": "Whether the tab has produced sound over the past couple of seconds (but it might not be heard if also muted). Equivalent to whether the speaker audio indicator is showing."
          },
          "discarded": {
            "type": "boolean",
            "description": "Whether the tab is discarded. A discarded tab is one whose content has been unloaded from memory, but is still visible in the tab strip. Its content gets reloaded the next time it's activated."
          },
          "autoDiscardable": {
            "type": "boolean",
            "description": "Whether the tab can be discarded automatically by the browser when resources are low."
          },
          "mutedInfo": {
            "$ref": "MutedInfo",
            "optional": true,
            "description": "Current tab muted state and the reason for the last state change."
          },
          "url": {
            "type": "string",
            "optional": true,
            "description": "The URL the tab is displaying. This property is only present if the extension's manifest includes the <code>\"tabs\"</code> permission."
          },
          "title": {
            "type": "string",
            "optional": true,
            "description": "The title of the tab. This property is only present if the extension's manifest includes the <code>\"tabs\"</code> permission."
          },
          "favIconUrl": {
            "type": "string",
            "optional": true,
            "description": "The URL of the tab's favicon. This property is only present if the extension's manifest includes the <code>\"tabs\"</code> permission. It may also be an empty string if the tab is loading."
          },
          "status": {
            "type": "string",
            "optional": true,
            "description": "Either <em>loading</em> or <em>complete</em>."
          },
          "incognito": {
            "type": "boolean",
            "description": "Whether the tab is in an incognito window."
          },
          "width": {
            "type": "integer",
            "optional": true,
            "description": "The width of the tab in pixels."
          },
          "height": {
            "type": "integer",
            "optional": true,
            "description": "The height of the tab in pixels."
          },
          "sessionId": {
            "type": "string",
            "optional": true,
            "description": "The session ID used to uniquely identify a Tab obtained from the $(ref:sessions) API."
          }
        }
      },
      {
        "id": "ZoomSettingsMode",
        "type": "string",
        "description": "Defines how zoom changes are handled, i.e. which entity is responsible for the actual scaling of the page; defaults to <code>automatic</code>.",
        "enum": [
          {
            "name": "automatic",
            "description": "Zoom changes are handled automatically by the browser."
          },
          {
            "name": "manual",
            "description": "Overrides the automatic handling of zoom changes. The <code>onZoomChange</code> event will still be dispatched, and it is the responsibility of the extension to listen for this event and manually scale the page. This mode does not support <code>per-origin</code> zooming, and will thus ignore the <code>scope</code> zoom setting and assume <code>per-tab</code>."
          },
          {
            "name": "disabled",
            "description": "Disables all zooming in the tab. The tab will revert to the default zoom level, and all attempted zoom changes will be ignored."
          }
        ]
      },
      {
        "id": "ZoomSettingsScope",
        "type": "string",
        "description": "Defines whether zoom changes will persist for the page's origin, or only take effect in this tab; defaults to <code>per-origin</code> when in <code>automatic</code> mode, and <code>per-tab</code> otherwise.",
        "enum": [
          {
            "name": "per-origin",
            "description": "Zoom changes will persist in the zoomed page's origin, i.e. all other tabs navigated to that same origin will be zoomed as well. Moreover, <code>per-origin</code> zoom changes are saved with the origin, meaning that when navigating to other pages in the same origin, they will all be zoomed to the same zoom factor. The <code>per-origin</code> scope is only available in the <code>automatic</code> mode."
          },
          {
            "name": "per-tab",
            "description": "Zoom changes only take effect in this tab, and zoom changes in other tabs will not affect the zooming of this tab. Also, <code>per-tab</code> zoom changes are reset on navigation; navigating a tab will always load pages with their <code>per-origin</code> zoom factors."
          }
        ]
      },
      {
        "id": "ZoomSettings",
        "type": "object",
        "description": "Defines how zoom changes in a tab are handled and at what scope.",
        "properties": {
          "mode": {
            "$ref": "ZoomSettingsMode",
            "description": "Defines how zoom changes are handled, i.e. which entity is responsible for the actual scaling of the page; defaults to <code>automatic</code>.",
            "optional": true
          },
          "scope": {
            "$ref": "ZoomSettingsScope",
            "description": "Defines whether zoom changes will persist for the page's origin, or only take effect in this tab; defaults to <code>per-origin</code> when in <code>automatic</code> mode, and <code>per-tab</code> otherwise.",
            "optional": true
          },
          "defaultZoomFactor": {
            "type": "number",
            "optional": true,
            "description": "Used to return the default zoom level for the current tab in calls to tabs.getZoomSettings."
          }
        }
      },
      {
        "id": "TabStatus",
        "type": "string",
        "enum": [
          "loading",
          "complete"
        ],
        "description": "Whether the tabs have completed loading."
      },
      {
        "id": "WindowType",
        "type": "string",
        "enum": [
          "normal",
          "popup",
          "panel",
          "app",
          "devtools"
        ],
        "description": "The type of window."
      }
    ],
    "properties": {
      "TAB_ID_NONE": {
        "value": -1,
        "description": "An ID which represents the absence of a browser tab."
      }
    },
    "functions": [
      {
        "name": "get",
        "type": "function",
        "description": "Retrieves details about the specified tab.",
        "parameters": [
          {
            "type": "integer",
            "name": "tabId",
            "minimum": 0
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "tab",
                "$ref": "Tab"
              }
            ]
          }
        ]
      },
      {
        "name": "getCurrent",
        "type": "function",
        "description": "Gets the tab that this script call is being made from. May be undefined if called from a non-tab context (for example: a background page or popup view).",
        "parameters": [
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "tab",
                "$ref": "Tab",
                "optional": true
              }
            ]
          }
        ]
      },
      {
        "name": "connect",
        "nocompile": true,
        "type": "function",
        "description": "Connects to the content script(s) in the specified tab. The $(ref:runtime.onConnect) event is fired in each content script running in the specified tab for the current extension. For more details, see <a href='messaging'>Content Script Messaging</a>.",
        "parameters": [
          {
            "type": "integer",
            "name": "tabId",
            "minimum": 0
          },
          {
            "type": "object",
            "name": "connectInfo",
            "properties": {
              "name": {
                "type": "string",
                "optional": true,
                "description": "Will be passed into onConnect for content scripts that are listening for the connection event."
              },
              "frameId": {
                "type": "integer",
                "optional": true,
                "minimum": 0,
                "description": "Open a port to a specific <a href='webNavigation#frame_ids'>frame</a> identified by <code>frameId</code> instead of all frames in the tab."
              }
            },
            "optional": true
          }
        ],
        "returns": {
          "$ref": "runtime.Port",
          "description": "A port that can be used to communicate with the content scripts running in the specified tab. The port's $(ref:runtime.Port) event is fired if the tab closes or does not exist. "
        }
      },
      {
        "name": "sendRequest",
        "deprecated": "Please use $(ref:runtime.sendMessage).",
        "nocompile": true,
        "type": "function",
        "description": "Sends a single request to the content script(s) in the specified tab, with an optional callback to run when a response is sent back.  The $(ref:extension.onRequest) event is fired in each content script running in the specified tab for the current extension.",
        "parameters": [
          {
            "type": "integer",
            "name": "tabId",
            "minimum": 0
          },
          {
            "type": "any",
            "name": "request"
          },
          {
            "type": "function",
            "name": "responseCallback",
            "optional": true,
            "parameters": [
              {
                "name": "response",
                "type": "any",
                "description": "The JSON response object sent by the handler of the request. If an error occurs while connecting to the specified tab, the callback will be called with no arguments and $(ref:runtime.lastError) will be set to the error message."
              }
            ]
          }
        ]
      },
      {
        "name": "sendMessage",
        "nocompile": true,
        "type": "function",
        "description": "Sends a single message to the content script(s) in the specified tab, with an optional callback to run when a response is sent back.  The $(ref:runtime.onMessage) event is fired in each content script running in the specified tab for the current extension.",
        "parameters": [
          {
            "type": "integer",
            "name": "tabId",
            "minimum": 0
          },
          {
            "type": "any",
            "name": "message",
            "description": "The message to send. This message should be a JSON-ifiable object."
          },
          {
            "type": "object",
            "name": "options",
            "properties": {
              "frameId": {
                "type": "integer",
                "optional": true,
                "minimum": 0,
                "description": "Send a message to a specific <a href='webNavigation#frame_ids'>frame</a> identified by <code>frameId</code> instead of all frames in the tab."
              }
            },
            "optional": true
          },
          {
            "type": "function",
            "name": "responseCallback",
            "optional": true,
            "parameters": [
              {
                "name": "response",
                "type": "any",
                "description": "The JSON response object sent by the handler of the message. If an error occurs while connecting to the specified tab, the callback will be called with no arguments and $(ref:runtime.lastError) will be set to the error message."
              }
            ]
          }
        ]
      },
      {
        "name": "getSelected",
        "deprecated": "Please use $(ref:tabs.query) <code>{active: true}</code>.",
        "type": "function",
        "description": "Gets the tab that is selected in the specified window.",
        "parameters": [
          {
            "type": "integer",
            "name": "windowId",
            "minimum": -2,
            "optional": true,
            "description": "Defaults to the <a href='windows#current-window'>current window</a>."
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "tab",
                "$ref": "Tab"
              }
            ]
          }
        ]
      },
      {
        "name": "getAllInWindow",
        "type": "function",
        "deprecated": "Please use $(ref:tabs.query) <code>{windowId: windowId}</code>.",
        "description": "Gets details about all tabs in the specified window.",
        "parameters": [
          {
            "type": "integer",
            "name": "windowId",
            "minimum": -2,
            "optional": true,
            "description": "Defaults to the <a href='windows#current-window'>current window</a>."
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "tabs",
                "type": "array",
                "items": {
                  "$ref": "Tab"
                }
              }
            ]
          }
        ]
      },
      {
        "name": "create",
        "type": "function",
        "description": "Creates a new tab.",
        "parameters": [
          {
            "type": "object",
            "name": "createProperties",
            "properties": {
              "windowId": {
                "type": "integer",
                "minimum": -2,
                "optional": true,
                "description": "The window to create the new tab in. Defaults to the <a href='windows#current-window'>current window</a>."
              },
              "index": {
                "type": "integer",
                "minimum": 0,
                "optional": true,
                "description": "The position the tab should take in the window. The provided value will be clamped to between zero and the number of tabs in the window."
              },
              "url": {
                "type": "string",
                "optional": true,
                "description": "The URL to navigate the tab to initially. Fully-qualified URLs must include a scheme (i.e. 'http://www.google.com', not 'www.google.com'). Relative URLs will be relative to the current page within the extension. Defaults to the New Tab Page."
              },
              "active": {
                "type": "boolean",
                "optional": true,
                "description": "Whether the tab should become the active tab in the window. Does not affect whether the window is focused (see $(ref:windows.update)). Defaults to <var>true</var>."
              },
              "selected": {
                "deprecated": "Please use <em>active</em>.",
                "type": "boolean",
                "optional": true,
                "description": "Whether the tab should become the selected tab in the window. Defaults to <var>true</var>"
              },
              "pinned": {
                "type": "boolean",
                "optional": true,
                "description": "Whether the tab should be pinned. Defaults to <var>false</var>"
              },
              "openerTabId": {
                "type": "integer",
                "minimum": 0,
                "optional": true,
                "description": "The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as the newly created tab."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": [
              {
                "name": "tab",
                "$ref": "Tab",
                "description": "Details about the created tab. Will contain the ID of the new tab."
              }
            ]
          }
        ]
      },
      {
        "name": "duplicate",
        "type": "function",
        "description": "Duplicates a tab.",
        "parameters": [
          {
            "type": "integer",
            "name": "tabId",
            "minimum": 0,
            "description": "The ID of the tab which is to be duplicated."
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": [
              {
                "name": "tab",
                "optional": true,
                "description": "Details about the duplicated tab. The $(ref:tabs.Tab) object doesn't contain <code>url</code>, <code>title</code> and <code>favIconUrl</code> if the <code>\"tabs\"</code> permission has not been requested.",
                "$ref": "Tab"
              }
            ]
          }
        ]
      },
      {
        "name": "query",
        "type": "function",
        "description": "Gets all tabs that have the specified properties, or all tabs if no properties are specified.",
        "parameters": [
          {
            "type": "object",
            "name": "queryInfo",
            "properties": {
              "active": {
                "type": "boolean",
                "optional": true,
                "description": "Whether the tabs are active in their windows."
              },
              "pinned": {
                "type": "boolean",
                "optional": true,
                "description": "Whether the tabs are pinned."
              },
              "audible": {
                "type": "boolean",
                "optional": true,
                "description": "Whether the tabs are audible."
              },
              "muted": {
                "type": "boolean",
                "optional": true,
                "description": "Whether the tabs are muted."
              },
              "highlighted": {
                "type": "boolean",
                "optional": true,
                "description": "Whether the tabs are highlighted."
              },
              "discarded": {
                "type": "boolean",
                "optional": true,
                "description": "Whether the tabs are discarded. A discarded tab is one whose content has been unloaded from memory, but is still visible in the tab strip. Its content gets reloaded the next time it's activated."
              },
              "autoDiscardable": {
                "type": "boolean",
                "optional": true,
                "description": "Whether the tabs can be discarded automatically by the browser when resources are low."
              },
              "currentWindow": {
                "type": "boolean",
                "optional": true,
                "description": "Whether the tabs are in the <a href='windows#current-window'>current window</a>."
              },
              "lastFocusedWindow": {
                "type": "boolean",
                "optional": true,
                "description": "Whether the tabs are in the last focused window."
              },
              "status": {
                "$ref": "TabStatus",
                "optional": true,
                "description": "Whether the tabs have completed loading."
              },
              "title": {
                "type": "string",
                "optional": true,
                "description": "Match page titles against a pattern. Note that this property is ignored if the extension doesn't have the <code>\"tabs\"</code> permission."
              },
              "url": {
                "choices": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                ],
                "optional": true,
                "description": "Match tabs against one or more <a href='match_patterns'>URL patterns</a>. Note that fragment identifiers are not matched. Note that this property is ignored if the extension doesn't have the <code>\"tabs\"</code> permission."
              },
              "windowId": {
                "type": "integer",
                "optional": true,
                "minimum": -2,
                "description": "The ID of the parent window, or $(ref:windows.WINDOW_ID_CURRENT) for the <a href='windows#current-window'>current window</a>."
              },
              "windowType": {
                "$ref": "WindowType",
                "optional": true,
                "description": "The type of window the tabs are in."
              },
              "index": {
                "type": "integer",
                "optional": true,
                "minimum": 0,
                "description": "The position of the tabs within their windows."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "result",
                "type": "array",
                "items": {
                  "$ref": "Tab"
                }
              }
            ]
          }
        ]
      },
      {
        "name": "highlight",
        "type": "function",
        "description": "Highlights the given tabs.",
        "parameters": [
          {
            "type": "object",
            "name": "highlightInfo",
            "properties": {
              "windowId": {
                "type": "integer",
                "optional": true,
                "description": "The window that contains the tabs.",
                "minimum": -2
              },
              "tabs": {
                "description": "One or more tab indices to highlight.",
                "choices": [
                  {
                    "type": "array",
                    "items": {
                      "type": "integer",
                      "minimum": 0
                    }
                  },
                  {
                    "type": "integer"
                  }
                ]
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": [
              {
                "name": "window",
                "$ref": "windows.Window",
                "description": "Contains details about the window whose tabs were highlighted."
              }
            ]
          }
        ]
      },
      {
        "name": "update",
        "type": "function",
        "description": "Modifies the properties of a tab. Properties that are not specified in <var>updateProperties</var> are not modified.",
        "parameters": [
          {
            "type": "integer",
            "name": "tabId",
            "minimum": 0,
            "optional": true,
            "description": "Defaults to the selected tab of the <a href='windows#current-window'>current window</a>."
          },
          {
            "type": "object",
            "name": "updateProperties",
            "properties": {
              "url": {
                "type": "string",
                "optional": true,
                "description": "A URL to navigate the tab to."
              },
              "active": {
                "type": "boolean",
                "optional": true,
                "description": "Whether the tab should be active. Does not affect whether the window is focused (see $(ref:windows.update))."
              },
              "highlighted": {
                "type": "boolean",
                "optional": true,
                "description": "Adds or removes the tab from the current selection."
              },
              "selected": {
                "deprecated": "Please use <em>highlighted</em>.",
                "type": "boolean",
                "optional": true,
                "description": "Whether the tab should be selected."
              },
              "pinned": {
                "type": "boolean",
                "optional": true,
                "description": "Whether the tab should be pinned."
              },
              "muted": {
                "type": "boolean",
                "optional": true,
                "description": "Whether the tab should be muted."
              },
              "openerTabId": {
                "type": "integer",
                "minimum": 0,
                "optional": true,
                "description": "The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as this tab."
              },
              "autoDiscardable": {
                "type": "boolean",
                "optional": true,
                "description": "Whether the tab should be discarded automatically by the browser when resources are low."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": [
              {
                "name": "tab",
                "$ref": "Tab",
                "optional": true,
                "description": "Details about the updated tab. The $(ref:tabs.Tab) object doesn't contain <code>url</code>, <code>title</code> and <code>favIconUrl</code> if the <code>\"tabs\"</code> permission has not been requested."
              }
            ]
          }
        ]
      },
      {
        "name": "move",
        "type": "function",
        "description": "Moves one or more tabs to a new position within its window, or to a new window. Note that tabs can only be moved to and from normal (window.type === \"normal\") windows.",
        "parameters": [
          {
            "name": "tabIds",
            "description": "The tab or list of tabs to move.",
            "choices": [
              {
                "type": "integer",
                "minimum": 0
              },
              {
                "type": "array",
                "items": {
                  "type": "integer",
                  "minimum": 0
                }
              }
            ]
          },
          {
            "type": "object",
            "name": "moveProperties",
            "properties": {
              "windowId": {
                "type": "integer",
                "minimum": -2,
                "optional": true,
                "description": "Defaults to the window the tab is currently in."
              },
              "index": {
                "type": "integer",
                "minimum": -1,
                "description": "The position to move the window to. -1 will place the tab at the end of the window."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": [
              {
                "name": "tabs",
                "description": "Details about the moved tabs.",
                "choices": [
                  {
                    "$ref": "Tab"
                  },
                  {
                    "type": "array",
                    "items": {
                      "$ref": "Tab"
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "reload",
        "type": "function",
        "description": "Reload a tab.",
        "parameters": [
          {
            "type": "integer",
            "name": "tabId",
            "minimum": 0,
            "optional": true,
            "description": "The ID of the tab to reload; defaults to the selected tab of the current window."
          },
          {
            "type": "object",
            "name": "reloadProperties",
            "optional": true,
            "properties": {
              "bypassCache": {
                "type": "boolean",
                "optional": true,
                "description": "Whether using any local cache. Default is false."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "remove",
        "type": "function",
        "description": "Closes one or more tabs.",
        "parameters": [
          {
            "name": "tabIds",
            "description": "The tab or list of tabs to close.",
            "choices": [
              {
                "type": "integer",
                "minimum": 0
              },
              {
                "type": "array",
                "items": {
                  "type": "integer",
                  "minimum": 0
                }
              }
            ]
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": []
          }
        ]
      },
      {
        "name": "detectLanguage",
        "type": "function",
        "description": "Detects the primary language of the content in a tab.",
        "parameters": [
          {
            "type": "integer",
            "name": "tabId",
            "minimum": 0,
            "optional": true,
            "description": "Defaults to the active tab of the <a href='windows#current-window'>current window</a>."
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "type": "string",
                "name": "language",
                "description": "An ISO language code such as <code>en</code> or <code>fr</code>. For a complete list of languages supported by this method, see <a href='http://src.chromium.org/viewvc/chrome/trunk/src/third_party/cld/languages/internal/languages.cc'>kLanguageInfoTable</a>. The 2nd to 4th columns will be checked and the first non-NULL value will be returned except for Simplified Chinese for which zh-CN will be returned. For an unknown language, <code>und</code> will be returned."
              }
            ]
          }
        ]
      },
      {
        "name": "captureVisibleTab",
        "type": "function",
        "description": "Captures the visible area of the currently active tab in the specified window. You must have <a href='declare_permissions'>&lt;all_urls&gt;</a> permission to use this method.",
        "parameters": [
          {
            "type": "integer",
            "name": "windowId",
            "minimum": -2,
            "optional": true,
            "description": "The target window. Defaults to the <a href='windows#current-window'>current window</a>."
          },
          {
            "$ref": "extensionTypes.ImageDetails",
            "name": "options",
            "optional": true
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "type": "string",
                "name": "dataUrl",
                "description": "A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display."
              }
            ]
          }
        ]
      },
      {
        "name": "executeScript",
        "type": "function",
        "description": "Injects JavaScript code into a page. For details, see the <a href='content_scripts#pi'>programmatic injection</a> section of the content scripts doc.",
        "parameters": [
          {
            "type": "integer",
            "name": "tabId",
            "minimum": 0,
            "optional": true,
            "description": "The ID of the tab in which to run the script; defaults to the active tab of the current window."
          },
          {
            "$ref": "extensionTypes.InjectDetails",
            "name": "details",
            "description": "Details of the script to run. Either the code or the file property must be set, but both may not be set at the same time."
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "description": "Called after all the JavaScript has been executed.",
            "parameters": [
              {
                "name": "result",
                "optional": true,
                "type": "array",
                "items": {
                  "type": "any",
                  "minimum": 0
                },
                "description": "The result of the script in every injected frame."
              }
            ]
          }
        ]
      },
      {
        "name": "insertCSS",
        "type": "function",
        "description": "Injects CSS into a page. For details, see the <a href='content_scripts#pi'>programmatic injection</a> section of the content scripts doc.",
        "parameters": [
          {
            "type": "integer",
            "name": "tabId",
            "minimum": 0,
            "optional": true,
            "description": "The ID of the tab in which to insert the CSS; defaults to the active tab of the current window."
          },
          {
            "$ref": "extensionTypes.InjectDetails",
            "name": "details",
            "description": "Details of the CSS text to insert. Either the code or the file property must be set, but both may not be set at the same time."
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "description": "Called when all the CSS has been inserted.",
            "parameters": []
          }
        ]
      },
      {
        "name": "setZoom",
        "type": "function",
        "description": "Zooms a specified tab.",
        "parameters": [
          {
            "type": "integer",
            "name": "tabId",
            "minimum": 0,
            "optional": true,
            "description": "The ID of the tab to zoom; defaults to the active tab of the current window."
          },
          {
            "type": "number",
            "name": "zoomFactor",
            "description": "The new zoom factor. Use a value of 0 here to set the tab to its current default zoom factor. Values greater than zero specify a (possibly non-default) zoom factor for the tab."
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "description": "Called after the zoom factor has been changed.",
            "parameters": []
          }
        ]
      },
      {
        "name": "getZoom",
        "type": "function",
        "description": "Gets the current zoom factor of a specified tab.",
        "parameters": [
          {
            "type": "integer",
            "name": "tabId",
            "minimum": 0,
            "optional": true,
            "description": "The ID of the tab to get the current zoom factor from; defaults to the active tab of the current window."
          },
          {
            "type": "function",
            "name": "callback",
            "description": "Called with the tab's current zoom factor after it has been fetched.",
            "parameters": [
              {
                "type": "number",
                "name": "zoomFactor",
                "description": "The tab's current zoom factor."
              }
            ]
          }
        ]
      },
      {
        "name": "setZoomSettings",
        "type": "function",
        "description": "Sets the zoom settings for a specified tab, which define how zoom changes are handled. These settings are reset to defaults upon navigating the tab.",
        "parameters": [
          {
            "type": "integer",
            "name": "tabId",
            "optional": true,
            "minimum": 0,
            "description": "The ID of the tab to change the zoom settings for; defaults to the active tab of the current window."
          },
          {
            "$ref": "ZoomSettings",
            "name": "zoomSettings",
            "description": "Defines how zoom changes are handled and at what scope."
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "description": "Called after the zoom settings have been changed.",
            "parameters": []
          }
        ]
      },
      {
        "name": "getZoomSettings",
        "type": "function",
        "description": "Gets the current zoom settings of a specified tab.",
        "parameters": [
          {
            "type": "integer",
            "name": "tabId",
            "optional": true,
            "minimum": 0,
            "description": "The ID of the tab to get the current zoom settings from; defaults to the active tab of the current window."
          },
          {
            "type": "function",
            "name": "callback",
            "description": "Called with the tab's current zoom settings.",
            "parameters": [
              {
                "$ref": "ZoomSettings",
                "name": "zoomSettings",
                "description": "The tab's current zoom settings."
              }
            ]
          }
        ]
      },
      {
        "name": "discard",
        "type": "function",
        "description": "Discards a tab from memory. Discarded tabs are still visible on the tab strip and are reloaded when activated.",
        "parameters": [
          {
            "type": "integer",
            "name": "tabId",
            "optional": true,
            "minimum": 0,
            "description": "The ID of the tab to be discarded. If specified, the tab will be discarded unless it's active or already discarded. If omitted, the browser will discard the least important tab. This can fail if no discardable tabs exist."
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "description": "Called after the operation is completed.",
            "parameters": [
              {
                "name": "tab",
                "$ref": "Tab",
                "optional": true,
                "description": "Discarded tab if it was successfully discarded. Undefined otherwise."
              }
            ]
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onCreated",
        "type": "function",
        "description": "Fired when a tab is created. Note that the tab's URL may not be set at the time this event fired, but you can listen to onUpdated events to be notified when a URL is set.",
        "parameters": [
          {
            "$ref": "Tab",
            "name": "tab",
            "description": "Details of the tab that was created."
          }
        ]
      },
      {
        "name": "onUpdated",
        "type": "function",
        "description": "Fired when a tab is updated.",
        "parameters": [
          {
            "type": "integer",
            "name": "tabId",
            "minimum": 0
          },
          {
            "type": "object",
            "name": "changeInfo",
            "description": "Lists the changes to the state of the tab that was updated.",
            "properties": {
              "status": {
                "type": "string",
                "optional": true,
                "description": "The status of the tab. Can be either <em>loading</em> or <em>complete</em>."
              },
              "url": {
                "type": "string",
                "optional": true,
                "description": "The tab's URL if it has changed."
              },
              "pinned": {
                "type": "boolean",
                "optional": true,
                "description": "The tab's new pinned state."
              },
              "audible": {
                "type": "boolean",
                "optional": true,
                "description": "The tab's new audible state."
              },
              "discarded": {
                "type": "boolean",
                "optional": true,
                "description": "The tab's new discarded state."
              },
              "autoDiscardable": {
                "type": "boolean",
                "optional": true,
                "description": "The tab's new auto-discardable state."
              },
              "mutedInfo": {
                "$ref": "MutedInfo",
                "optional": true,
                "description": "The tab's new muted state and the reason for the change."
              },
              "favIconUrl": {
                "type": "string",
                "optional": true,
                "description": "The tab's new favicon URL."
              },
              "title": {
                "type": "string",
                "optional": true,
                "description": "The tab's new title."
              }
            }
          },
          {
            "$ref": "Tab",
            "name": "tab",
            "description": "Gives the state of the tab that was updated."
          }
        ]
      },
      {
        "name": "onMoved",
        "type": "function",
        "description": "Fired when a tab is moved within a window. Only one move event is fired, representing the tab the user directly moved. Move events are not fired for the other tabs that must move in response. This event is not fired when a tab is moved between windows. For that, see $(ref:tabs.onDetached).",
        "parameters": [
          {
            "type": "integer",
            "name": "tabId",
            "minimum": 0
          },
          {
            "type": "object",
            "name": "moveInfo",
            "properties": {
              "windowId": {
                "type": "integer",
                "minimum": 0
              },
              "fromIndex": {
                "type": "integer",
                "minimum": 0
              },
              "toIndex": {
                "type": "integer",
                "minimum": 0
              }
            }
          }
        ]
      },
      {
        "name": "onSelectionChanged",
        "deprecated": "Please use $(ref:tabs.onActivated).",
        "type": "function",
        "description": "Fires when the selected tab in a window changes.",
        "parameters": [
          {
            "type": "integer",
            "name": "tabId",
            "minimum": 0,
            "description": "The ID of the tab that has become active."
          },
          {
            "type": "object",
            "name": "selectInfo",
            "properties": {
              "windowId": {
                "type": "integer",
                "minimum": 0,
                "description": "The ID of the window the selected tab changed inside of."
              }
            }
          }
        ]
      },
      {
        "name": "onActiveChanged",
        "deprecated": "Please use $(ref:tabs.onActivated).",
        "type": "function",
        "description": "Fires when the selected tab in a window changes. Note that the tab's URL may not be set at the time this event fired, but you can listen to $(ref:tabs.onUpdated) events to be notified when a URL is set.",
        "parameters": [
          {
            "type": "integer",
            "name": "tabId",
            "minimum": 0,
            "description": "The ID of the tab that has become active."
          },
          {
            "type": "object",
            "name": "selectInfo",
            "properties": {
              "windowId": {
                "type": "integer",
                "minimum": 0,
                "description": "The ID of the window the selected tab changed inside of."
              }
            }
          }
        ]
      },
      {
        "name": "onActivated",
        "type": "function",
        "description": "Fires when the active tab in a window changes. Note that the tab's URL may not be set at the time this event fired, but you can listen to onUpdated events to be notified when a URL is set.",
        "parameters": [
          {
            "type": "object",
            "name": "activeInfo",
            "properties": {
              "tabId": {
                "type": "integer",
                "minimum": 0,
                "description": "The ID of the tab that has become active."
              },
              "windowId": {
                "type": "integer",
                "minimum": 0,
                "description": "The ID of the window the active tab changed inside of."
              }
            }
          }
        ]
      },
      {
        "name": "onHighlightChanged",
        "deprecated": "Please use $(ref:tabs.onHighlighted).",
        "type": "function",
        "description": "Fired when the highlighted or selected tabs in a window changes.",
        "parameters": [
          {
            "type": "object",
            "name": "selectInfo",
            "properties": {
              "windowId": {
                "type": "integer",
                "minimum": 0,
                "description": "The window whose tabs changed."
              },
              "tabIds": {
                "type": "array",
                "name": "tabIds",
                "items": {
                  "type": "integer",
                  "minimum": 0
                },
                "description": "All highlighted tabs in the window."
              }
            }
          }
        ]
      },
      {
        "name": "onHighlighted",
        "type": "function",
        "description": "Fired when the highlighted or selected tabs in a window changes.",
        "parameters": [
          {
            "type": "object",
            "name": "highlightInfo",
            "properties": {
              "windowId": {
                "type": "integer",
                "minimum": 0,
                "description": "The window whose tabs changed."
              },
              "tabIds": {
                "type": "array",
                "name": "tabIds",
                "items": {
                  "type": "integer",
                  "minimum": 0
                },
                "description": "All highlighted tabs in the window."
              }
            }
          }
        ]
      },
      {
        "name": "onDetached",
        "type": "function",
        "description": "Fired when a tab is detached from a window, for example because it is being moved between windows.",
        "parameters": [
          {
            "type": "integer",
            "name": "tabId",
            "minimum": 0
          },
          {
            "type": "object",
            "name": "detachInfo",
            "properties": {
              "oldWindowId": {
                "type": "integer",
                "minimum": 0
              },
              "oldPosition": {
                "type": "integer",
                "minimum": 0
              }
            }
          }
        ]
      },
      {
        "name": "onAttached",
        "type": "function",
        "description": "Fired when a tab is attached to a window, for example because it was moved between windows.",
        "parameters": [
          {
            "type": "integer",
            "name": "tabId",
            "minimum": 0
          },
          {
            "type": "object",
            "name": "attachInfo",
            "properties": {
              "newWindowId": {
                "type": "integer",
                "minimum": 0
              },
              "newPosition": {
                "type": "integer",
                "minimum": 0
              }
            }
          }
        ]
      },
      {
        "name": "onRemoved",
        "type": "function",
        "description": "Fired when a tab is closed.",
        "parameters": [
          {
            "type": "integer",
            "name": "tabId",
            "minimum": 0
          },
          {
            "type": "object",
            "name": "removeInfo",
            "properties": {
              "windowId": {
                "type": "integer",
                "minimum": 0,
                "description": "The window whose tab is closed."
              },
              "isWindowClosing": {
                "type": "boolean",
                "description": "True when the tab is being closed because its window is being closed."
              }
            }
          }
        ]
      },
      {
        "name": "onReplaced",
        "type": "function",
        "description": "Fired when a tab is replaced with another tab due to prerendering or instant.",
        "parameters": [
          {
            "type": "integer",
            "name": "addedTabId",
            "minimum": 0
          },
          {
            "type": "integer",
            "name": "removedTabId",
            "minimum": 0
          }
        ]
      },
      {
        "name": "onZoomChange",
        "type": "function",
        "description": "Fired when a tab is zoomed.",
        "parameters": [
          {
            "type": "object",
            "name": "ZoomChangeInfo",
            "properties": {
              "tabId": {
                "type": "integer",
                "minimum": 0
              },
              "oldZoomFactor": {
                "type": "number"
              },
              "newZoomFactor": {
                "type": "number"
              },
              "zoomSettings": {
                "$ref": "ZoomSettings"
              }
            }
          }
        ]
      }
    ]
  },
  {
    "namespace": "topSites",
    "description": "Use the <code>chrome.topSites</code> API to access the top sites that are displayed on the new tab page.",
    "types": [
      {
        "id": "MostVisitedURL",
        "type": "object",
        "description": "An object encapsulating a most visited URL, such as the URLs on the new tab page.",
        "properties": {
          "url": {
            "type": "string",
            "description": "The most visited URL."
          },
          "title": {
            "type": "string",
            "description": "The title of the page"
          }
        }
      }
    ],
    "functions": [
      {
        "name": "get",
        "type": "function",
        "description": "Gets a list of top sites.",
        "parameters": [
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "type": "array",
                "name": "data",
                "items": {
                  "$ref": "MostVisitedURL"
                }
              }
            ]
          }
        ]
      }
    ],
    "dependencies": [
      "permission:topSites"
    ]
  },
  {
    "namespace": "tts",
    "description": "Use the <code>chrome.tts</code> API to play synthesized text-to-speech (TTS). See also the related <a href='http://developer.chrome.com/extensions/ttsEngine'>ttsEngine</a> API, which allows an extension to implement a speech engine.",
    "types": [
      {
        "id": "EventType",
        "type": "string",
        "enum": [
          "start",
          "end",
          "word",
          "sentence",
          "marker",
          "interrupted",
          "cancelled",
          "error",
          "pause",
          "resume"
        ]
      },
      {
        "id": "VoiceGender",
        "type": "string",
        "enum": [
          "male",
          "female"
        ]
      },
      {
        "id": "TtsEvent",
        "type": "object",
        "description": "An event from the TTS engine to communicate the status of an utterance.",
        "properties": {
          "type": {
            "$ref": "EventType",
            "description": "The type can be 'start' as soon as speech has started, 'word' when a word boundary is reached, 'sentence' when a sentence boundary is reached, 'marker' when an SSML mark element is reached, 'end' when the end of the utterance is reached, 'interrupted' when the utterance is stopped or interrupted before reaching the end, 'cancelled' when it's removed from the queue before ever being synthesized, or 'error' when any other error occurs. When pausing speech, a 'pause' event is fired if a particular utterance is paused in the middle, and 'resume' if an utterance resumes speech. Note that pause and resume events may not fire if speech is paused in-between utterances."
          },
          "charIndex": {
            "type": "number",
            "optional": true,
            "description": "The index of the current character in the utterance."
          },
          "errorMessage": {
            "type": "string",
            "description": "The error description, if the event type is 'error'.",
            "optional": true
          },
          "srcId": {
            "type": "number",
            "description": "An ID unique to the calling function's context so that events can get routed back to the correct tts.speak call.",
            "nodoc": true,
            "optional": true
          },
          "isFinalEvent": {
            "type": "boolean",
            "description": "True if this is the final event that will be sent to this handler.",
            "nodoc": true,
            "optional": true
          }
        }
      },
      {
        "id": "TtsVoice",
        "type": "object",
        "description": "A description of a voice available for speech synthesis.",
        "properties": {
          "voiceName": {
            "type": "string",
            "optional": true,
            "description": "The name of the voice."
          },
          "lang": {
            "type": "string",
            "optional": true,
            "description": "The language that this voice supports, in the form <em>language</em>-<em>region</em>. Examples: 'en', 'en-US', 'en-GB', 'zh-CN'."
          },
          "gender": {
            "$ref": "VoiceGender",
            "optional": true,
            "description": "This voice's gender."
          },
          "remote": {
            "type": "boolean",
            "optional": true,
            "description": "If true, the synthesis engine is a remote network resource. It may be higher latency and may incur bandwidth costs."
          },
          "extensionId": {
            "type": "string",
            "optional": true,
            "description": "The ID of the extension providing this voice."
          },
          "eventTypes": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "optional": true,
            "description": "All of the callback event types that this voice is capable of sending."
          }
        }
      }
    ],
    "functions": [
      {
        "name": "speak",
        "type": "function",
        "description": "Speaks text using a text-to-speech engine.",
        "parameters": [
          {
            "type": "string",
            "name": "utterance",
            "description": "The text to speak, either plain text or a complete, well-formed SSML document. Speech engines that do not support SSML will strip away the tags and speak the text. The maximum length of the text is 32,768 characters."
          },
          {
            "type": "object",
            "name": "options",
            "optional": true,
            "description": "The speech options.",
            "properties": {
              "enqueue": {
                "type": "boolean",
                "optional": true,
                "description": "If true, enqueues this utterance if TTS is already in progress. If false (the default), interrupts any current speech and flushes the speech queue before speaking this new utterance."
              },
              "voiceName": {
                "type": "string",
                "optional": true,
                "description": "The name of the voice to use for synthesis. If empty, uses any available voice."
              },
              "extensionId": {
                "type": "string",
                "optional": true,
                "description": "The extension ID of the speech engine to use, if known."
              },
              "lang": {
                "type": "string",
                "optional": true,
                "description": "The language to be used for synthesis, in the form <em>language</em>-<em>region</em>. Examples: 'en', 'en-US', 'en-GB', 'zh-CN'."
              },
              "gender": {
                "$ref": "VoiceGender",
                "optional": true,
                "description": "Gender of voice for synthesized speech."
              },
              "rate": {
                "type": "number",
                "optional": true,
                "minimum": 0.1,
                "maximum": 10,
                "description": "Speaking rate relative to the default rate for this voice. 1.0 is the default rate, normally around 180 to 220 words per minute. 2.0 is twice as fast, and 0.5 is half as fast. Values below 0.1 or above 10.0 are strictly disallowed, but many voices will constrain the minimum and maximum rates further&mdash;for example a particular voice may not actually speak faster than 3 times normal even if you specify a value larger than 3.0."
              },
              "pitch": {
                "type": "number",
                "optional": true,
                "minimum": 0,
                "maximum": 2,
                "description": "Speaking pitch between 0 and 2 inclusive, with 0 being lowest and 2 being highest. 1.0 corresponds to a voice's default pitch."
              },
              "volume": {
                "type": "number",
                "optional": true,
                "minimum": 0,
                "maximum": 1,
                "description": "Speaking volume between 0 and 1 inclusive, with 0 being lowest and 1 being highest, with a default of 1.0."
              },
              "requiredEventTypes": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "optional": true,
                "description": "The TTS event types the voice must support."
              },
              "desiredEventTypes": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "optional": true,
                "description": "The TTS event types that you are interested in listening to. If missing, all event types may be sent."
              },
              "onEvent": {
                "type": "function",
                "optional": true,
                "description": "This function is called with events that occur in the process of speaking the utterance.",
                "parameters": [
                  {
                    "name": "event",
                    "$ref": "TtsEvent",
                    "description": "The update event from the text-to-speech engine indicating the status of this utterance."
                  }
                ]
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "description": "Called right away, before speech finishes. Check chrome.runtime.lastError to make sure there were no errors. Use options.onEvent to get more detailed feedback.",
            "parameters": []
          }
        ]
      },
      {
        "name": "stop",
        "type": "function",
        "description": "Stops any current speech and flushes the queue of any pending utterances. In addition, if speech was paused, it will now be un-paused for the next call to speak.",
        "parameters": []
      },
      {
        "name": "pause",
        "type": "function",
        "description": "Pauses speech synthesis, potentially in the middle of an utterance. A call to resume or stop will un-pause speech.",
        "parameters": []
      },
      {
        "name": "resume",
        "type": "function",
        "description": "If speech was paused, resumes speaking where it left off.",
        "parameters": []
      },
      {
        "name": "isSpeaking",
        "type": "function",
        "description": "Checks whether the engine is currently speaking. On Mac OS X, the result is true whenever the system speech engine is speaking, even if the speech wasn't initiated by Chrome.",
        "parameters": [
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": [
              {
                "name": "speaking",
                "type": "boolean",
                "description": "True if speaking, false otherwise."
              }
            ]
          }
        ]
      },
      {
        "name": "getVoices",
        "type": "function",
        "description": "Gets an array of all available voices.",
        "parameters": [
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": [
              {
                "type": "array",
                "name": "voices",
                "items": {
                  "$ref": "TtsVoice"
                },
                "description": "Array of $(ref:tts.TtsVoice) objects representing the available voices for speech synthesis."
              }
            ]
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onEvent",
        "type": "function",
        "nodoc": true,
        "parameters": [
          {
            "name": "event",
            "$ref": "TtsEvent",
            "description": "The event from the text-to-speech engine indicating the status of this utterance."
          }
        ],
        "description": "Used to pass events back to the function calling speak()."
      }
    ],
    "dependencies": [
      "permission:tts"
    ]
  },
  {
    "namespace": "ttsEngine",
    "description": "Use the <code>chrome.ttsEngine</code> API to implement a text-to-speech(TTS) engine using an extension. If your extension registers using this API, it will receive events containing an utterance to be spoken and other parameters when any extension or Chrome App uses the <a href='tts'>tts</a> API to generate speech. Your extension can then use any available web technology to synthesize and output the speech, and send events back to the calling function to report the status.",
    "types": [
      {
        "id": "VoiceGender",
        "type": "string",
        "enum": [
          "male",
          "female"
        ]
      }
    ],
    "functions": [
      {
        "name": "sendTtsEvent",
        "nodoc": true,
        "type": "function",
        "description": "Routes a TTS event from a speech engine to a client.",
        "parameters": [
          {
            "type": "integer",
            "name": "requestId"
          },
          {
            "name": "event",
            "$ref": "tts.TtsEvent",
            "description": "The update event from the text-to-speech engine indicating the status of this utterance."
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onSpeak",
        "type": "function",
        "description": "Called when the user makes a call to tts.speak() and one of the voices from this extension's manifest is the first to match the options object.",
        "parameters": [
          {
            "type": "string",
            "name": "utterance",
            "description": "The text to speak, specified as either plain text or an SSML document. If your engine does not support SSML, you should strip out all XML markup and synthesize only the underlying text content. The value of this parameter is guaranteed to be no more than 32,768 characters. If this engine does not support speaking that many characters at a time, the utterance should be split into smaller chunks and queued internally without returning an error."
          },
          {
            "type": "object",
            "name": "options",
            "description": "Options specified to the tts.speak() method.",
            "properties": {
              "voiceName": {
                "type": "string",
                "optional": true,
                "description": "The name of the voice to use for synthesis."
              },
              "lang": {
                "type": "string",
                "optional": true,
                "description": "The language to be used for synthesis, in the form <em>language</em>-<em>region</em>. Examples: 'en', 'en-US', 'en-GB', 'zh-CN'."
              },
              "gender": {
                "$ref": "VoiceGender",
                "optional": true,
                "description": "Gender of voice for synthesized speech."
              },
              "rate": {
                "type": "number",
                "optional": true,
                "minimum": 0.1,
                "maximum": 10,
                "description": "Speaking rate relative to the default rate for this voice. 1.0 is the default rate, normally around 180 to 220 words per minute. 2.0 is twice as fast, and 0.5 is half as fast. This value is guaranteed to be between 0.1 and 10.0, inclusive. When a voice does not support this full range of rates, don't return an error. Instead, clip the rate to the range the voice supports."
              },
              "pitch": {
                "type": "number",
                "optional": true,
                "minimum": 0,
                "maximum": 2,
                "description": "Speaking pitch between 0 and 2 inclusive, with 0 being lowest and 2 being highest. 1.0 corresponds to this voice's default pitch."
              },
              "volume": {
                "type": "number",
                "optional": true,
                "minimum": 0,
                "maximum": 1,
                "description": "Speaking volume between 0 and 1 inclusive, with 0 being lowest and 1 being highest, with a default of 1.0."
              }
            }
          },
          {
            "name": "sendTtsEvent",
            "type": "function",
            "description": "Call this function with events that occur in the process of speaking the utterance.",
            "parameters": [
              {
                "name": "event",
                "$ref": "tts.TtsEvent",
                "description": "The event from the text-to-speech engine indicating the status of this utterance."
              }
            ]
          }
        ]
      },
      {
        "name": "onStop",
        "type": "function",
        "description": "Fired when a call is made to tts.stop and this extension may be in the middle of speaking. If an extension receives a call to onStop and speech is already stopped, it should do nothing (not raise an error). If speech is in the paused state, this should cancel the paused state."
      },
      {
        "name": "onPause",
        "type": "function",
        "description": "Optional: if an engine supports the pause event, it should pause the current utterance being spoken, if any, until it receives a resume event or stop event. Note that a stop event should also clear the paused state."
      },
      {
        "name": "onResume",
        "type": "function",
        "description": "Optional: if an engine supports the pause event, it should also support the resume event, to continue speaking the current utterance, if any. Note that a stop event should also clear the paused state."
      }
    ],
    "dependencies": [
      "permission:ttsEngine"
    ]
  },
  {
    "namespace": "types",
    "description": "The <code>chrome.types</code> API contains type declarations for Chrome.",
    "types": [
      {
        "id": "ChromeSettingScope",
        "type": "string",
        "enum": [
          "regular",
          "regular_only",
          "incognito_persistent",
          "incognito_session_only"
        ],
        "description": "The scope of the ChromeSetting. One of<ul><li><var>regular</var>: setting for the regular profile (which is inherited by the incognito profile if not overridden elsewhere),</li><li><var>regular_only</var>: setting for the regular profile only (not inherited by the incognito profile),</li><li><var>incognito_persistent</var>: setting for the incognito profile that survives browser restarts (overrides regular preferences),</li><li><var>incognito_session_only</var>: setting for the incognito profile that can only be set during an incognito session and is deleted when the incognito session ends (overrides regular and incognito_persistent preferences).</li></ul>"
      },
      {
        "id": "LevelOfControl",
        "type": "string",
        "enum": [
          "not_controllable",
          "controlled_by_other_extensions",
          "controllable_by_this_extension",
          "controlled_by_this_extension"
        ],
        "description": "One of<ul><li><var>not_controllable</var>: cannot be controlled by any extension</li><li><var>controlled_by_other_extensions</var>: controlled by extensions with higher precedence</li><li><var>controllable_by_this_extension</var>: can be controlled by this extension</li><li><var>controlled_by_this_extension</var>: controlled by this extension</li></ul>"
      },
      {
        "id": "ChromeSetting",
        "type": "object",
        "js_module": "ChromeSetting",
        "customBindings": "ChromeSetting",
        "description": "An interface that allows access to a Chrome browser setting. See $(ref:accessibilityFeatures) for an example.",
        "functions": [
          {
            "name": "get",
            "type": "function",
            "nocompile": true,
            "description": "Gets the value of a setting.",
            "parameters": [
              {
                "name": "details",
                "type": "object",
                "description": "Which setting to consider.",
                "properties": {
                  "incognito": {
                    "type": "boolean",
                    "optional": true,
                    "description": "Whether to return the value that applies to the incognito session (default false)."
                  }
                }
              },
              {
                "name": "callback",
                "type": "function",
                "parameters": [
                  {
                    "name": "details",
                    "type": "object",
                    "description": "Details of the currently effective value.",
                    "properties": {
                      "value": {
                        "description": "The value of the setting.",
                        "type": "any"
                      },
                      "levelOfControl": {
                        "$ref": "LevelOfControl",
                        "description": "The level of control of the setting."
                      },
                      "incognitoSpecific": {
                        "description": "Whether the effective value is specific to the incognito session.<br/>This property will <em>only</em> be present if the <var>incognito</var> property in the <var>details</var> parameter of <code>get()</code> was true.",
                        "type": "boolean",
                        "optional": true
                      }
                    }
                  }
                ]
              }
            ]
          },
          {
            "name": "set",
            "type": "function",
            "nocompile": true,
            "description": "Sets the value of a setting.",
            "parameters": [
              {
                "name": "details",
                "type": "object",
                "description": "Which setting to change.",
                "properties": {
                  "value": {
                    "description": "The value of the setting. <br/>Note that every setting has a specific value type, which is described together with the setting. An extension should <em>not</em> set a value of a different type.",
                    "type": "any"
                  },
                  "scope": {
                    "$ref": "ChromeSettingScope",
                    "optional": true,
                    "description": "Where to set the setting (default: regular)."
                  }
                }
              },
              {
                "name": "callback",
                "type": "function",
                "description": "Called at the completion of the set operation.",
                "optional": true,
                "parameters": []
              }
            ]
          },
          {
            "name": "clear",
            "type": "function",
            "nocompile": true,
            "description": "Clears the setting, restoring any default value.",
            "parameters": [
              {
                "name": "details",
                "type": "object",
                "description": "Which setting to clear.",
                "properties": {
                  "scope": {
                    "$ref": "ChromeSettingScope",
                    "optional": true,
                    "description": "Where to clear the setting (default: regular)."
                  }
                }
              },
              {
                "name": "callback",
                "type": "function",
                "description": "Called at the completion of the clear operation.",
                "optional": true,
                "parameters": []
              }
            ]
          }
        ],
        "events": [
          {
            "name": "onChange",
            "description": "Fired after the setting changes.",
            "parameters": [
              {
                "type": "object",
                "name": "details",
                "properties": {
                  "value": {
                    "description": "The value of the setting after the change.",
                    "type": "any"
                  },
                  "levelOfControl": {
                    "$ref": "LevelOfControl",
                    "description": "The level of control of the setting."
                  },
                  "incognitoSpecific": {
                    "description": "Whether the value that has changed is specific to the incognito session.<br/>This property will <em>only</em> be present if the user has enabled the extension in incognito mode.",
                    "type": "boolean",
                    "optional": true
                  }
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "namespace": "webNavigation",
    "description": "Use the <code>chrome.webNavigation</code> API to receive notifications about the status of navigation requests in-flight.",
    "types": [
      {
        "id": "TransitionType",
        "type": "string",
        "enum": [
          "link",
          "typed",
          "auto_bookmark",
          "auto_subframe",
          "manual_subframe",
          "generated",
          "start_page",
          "form_submit",
          "reload",
          "keyword",
          "keyword_generated"
        ],
        "description": "Cause of the navigation. The same transition types as defined in the history API are used. These are the same transition types as defined in the <a href=\"history#transition_types\">history API</a> except with <code>\"start_page\"</code> in place of <code>\"auto_toplevel\"</code> (for backwards compatibility)."
      },
      {
        "id": "TransitionQualifier",
        "type": "string",
        "enum": [
          "client_redirect",
          "server_redirect",
          "forward_back",
          "from_address_bar"
        ]
      }
    ],
    "functions": [
      {
        "name": "getFrame",
        "type": "function",
        "description": "Retrieves information about the given frame. A frame refers to an &lt;iframe&gt; or a &lt;frame&gt; of a web page and is identified by a tab ID and a frame ID.",
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "description": "Information about the frame to retrieve information about.",
            "properties": {
              "tabId": {
                "type": "integer",
                "minimum": 0,
                "description": "The ID of the tab in which the frame is."
              },
              "processId": {
                "type": "integer",
                "optional": true,
                "deprecated": "Frames are now uniquely identified by their tab ID and frame ID; the process ID is no longer needed and therefore ignored.",
                "description": "The ID of the process that runs the renderer for this tab."
              },
              "frameId": {
                "type": "integer",
                "minimum": 0,
                "description": "The ID of the frame in the given tab."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "type": "object",
                "name": "details",
                "optional": true,
                "description": "Information about the requested frame, null if the specified frame ID and/or tab ID are invalid.",
                "properties": {
                  "errorOccurred": {
                    "type": "boolean",
                    "description": "True if the last navigation in this frame was interrupted by an error, i.e. the onErrorOccurred event fired."
                  },
                  "url": {
                    "type": "string",
                    "description": "The URL currently associated with this frame, if the frame identified by the frameId existed at one point in the given tab. The fact that an URL is associated with a given frameId does not imply that the corresponding frame still exists."
                  },
                  "parentFrameId": {
                    "type": "integer",
                    "description": "ID of frame that wraps the frame. Set to -1 of no parent frame exists."
                  }
                }
              }
            ]
          }
        ]
      },
      {
        "name": "getAllFrames",
        "type": "function",
        "description": "Retrieves information about all frames of a given tab.",
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "description": "Information about the tab to retrieve all frames from.",
            "properties": {
              "tabId": {
                "type": "integer",
                "minimum": 0,
                "description": "The ID of the tab."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "details",
                "type": "array",
                "description": "A list of frames in the given tab, null if the specified tab ID is invalid.",
                "optional": true,
                "items": {
                  "type": "object",
                  "properties": {
                    "errorOccurred": {
                      "type": "boolean",
                      "description": "True if the last navigation in this frame was interrupted by an error, i.e. the onErrorOccurred event fired."
                    },
                    "processId": {
                      "type": "integer",
                      "description": "The ID of the process that runs the renderer for this frame."
                    },
                    "frameId": {
                      "type": "integer",
                      "description": "The ID of the frame. 0 indicates that this is the main frame; a positive value indicates the ID of a subframe."
                    },
                    "parentFrameId": {
                      "type": "integer",
                      "description": "ID of frame that wraps the frame. Set to -1 of no parent frame exists."
                    },
                    "url": {
                      "type": "string",
                      "description": "The URL currently associated with this frame."
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onBeforeNavigate",
        "type": "function",
        "description": "Fired when a navigation is about to occur.",
        "filters": [
          {
            "name": "url",
            "type": "array",
            "items": {
              "$ref": "events.UrlFilter"
            },
            "description": "Conditions that the URL being navigated to must satisfy. The 'schemes' and 'ports' fields of UrlFilter are ignored for this event."
          }
        ],
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "properties": {
              "tabId": {
                "type": "integer",
                "description": "The ID of the tab in which the navigation is about to occur."
              },
              "url": {
                "type": "string"
              },
              "processId": {
                "type": "integer",
                "description": "The value of -1.",
                "deprecated": "The processId is no longer set for this event, since the process which will render the resulting document is not known until onCommit."
              },
              "frameId": {
                "type": "integer",
                "description": "0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique for a given tab and process."
              },
              "parentFrameId": {
                "type": "integer",
                "description": "ID of frame that wraps the frame. Set to -1 of no parent frame exists."
              },
              "timeStamp": {
                "type": "number",
                "description": "The time when the browser was about to start the navigation, in milliseconds since the epoch."
              }
            }
          }
        ]
      },
      {
        "name": "onCommitted",
        "type": "function",
        "description": "Fired when a navigation is committed. The document (and the resources it refers to, such as images and subframes) might still be downloading, but at least part of the document has been received from the server and the browser has decided to switch to the new document.",
        "filters": [
          {
            "name": "url",
            "type": "array",
            "items": {
              "$ref": "events.UrlFilter"
            },
            "description": "Conditions that the URL being navigated to must satisfy. The 'schemes' and 'ports' fields of UrlFilter are ignored for this event."
          }
        ],
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "properties": {
              "tabId": {
                "type": "integer",
                "description": "The ID of the tab in which the navigation occurs."
              },
              "url": {
                "type": "string"
              },
              "processId": {
                "type": "integer",
                "description": "The ID of the process that runs the renderer for this frame."
              },
              "frameId": {
                "type": "integer",
                "description": "0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique within a tab."
              },
              "transitionType": {
                "$ref": "TransitionType",
                "description": "Cause of the navigation."
              },
              "transitionQualifiers": {
                "type": "array",
                "description": "A list of transition qualifiers.",
                "items": {
                  "$ref": "TransitionQualifier"
                }
              },
              "timeStamp": {
                "type": "number",
                "description": "The time when the navigation was committed, in milliseconds since the epoch."
              }
            }
          }
        ]
      },
      {
        "name": "onDOMContentLoaded",
        "type": "function",
        "description": "Fired when the page's DOM is fully constructed, but the referenced resources may not finish loading.",
        "filters": [
          {
            "name": "url",
            "type": "array",
            "items": {
              "$ref": "events.UrlFilter"
            },
            "description": "Conditions that the URL being navigated to must satisfy. The 'schemes' and 'ports' fields of UrlFilter are ignored for this event."
          }
        ],
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "properties": {
              "tabId": {
                "type": "integer",
                "description": "The ID of the tab in which the navigation occurs."
              },
              "url": {
                "type": "string"
              },
              "processId": {
                "type": "integer",
                "description": "The ID of the process that runs the renderer for this frame."
              },
              "frameId": {
                "type": "integer",
                "description": "0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique within a tab."
              },
              "timeStamp": {
                "type": "number",
                "description": "The time when the page's DOM was fully constructed, in milliseconds since the epoch."
              }
            }
          }
        ]
      },
      {
        "name": "onCompleted",
        "type": "function",
        "description": "Fired when a document, including the resources it refers to, is completely loaded and initialized.",
        "filters": [
          {
            "name": "url",
            "type": "array",
            "items": {
              "$ref": "events.UrlFilter"
            },
            "description": "Conditions that the URL being navigated to must satisfy. The 'schemes' and 'ports' fields of UrlFilter are ignored for this event."
          }
        ],
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "properties": {
              "tabId": {
                "type": "integer",
                "description": "The ID of the tab in which the navigation occurs."
              },
              "url": {
                "type": "string"
              },
              "processId": {
                "type": "integer",
                "description": "The ID of the process that runs the renderer for this frame."
              },
              "frameId": {
                "type": "integer",
                "description": "0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique within a tab."
              },
              "timeStamp": {
                "type": "number",
                "description": "The time when the document finished loading, in milliseconds since the epoch."
              }
            }
          }
        ]
      },
      {
        "name": "onErrorOccurred",
        "type": "function",
        "description": "Fired when an error occurs and the navigation is aborted. This can happen if either a network error occurred, or the user aborted the navigation.",
        "filters": [
          {
            "name": "url",
            "type": "array",
            "items": {
              "$ref": "events.UrlFilter"
            },
            "description": "Conditions that the URL being navigated to must satisfy. The 'schemes' and 'ports' fields of UrlFilter are ignored for this event."
          }
        ],
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "properties": {
              "tabId": {
                "type": "integer",
                "description": "The ID of the tab in which the navigation occurs."
              },
              "url": {
                "type": "string"
              },
              "processId": {
                "type": "integer",
                "description": "The value of -1.",
                "deprecated": "The processId is no longer set for this event."
              },
              "frameId": {
                "type": "integer",
                "description": "0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique within a tab."
              },
              "error": {
                "type": "string",
                "description": "The error description."
              },
              "timeStamp": {
                "type": "number",
                "description": "The time when the error occurred, in milliseconds since the epoch."
              }
            }
          }
        ]
      },
      {
        "name": "onCreatedNavigationTarget",
        "type": "function",
        "description": "Fired when a new window, or a new tab in an existing window, is created to host a navigation.",
        "filters": [
          {
            "name": "url",
            "type": "array",
            "items": {
              "$ref": "events.UrlFilter"
            },
            "description": "Conditions that the URL being navigated to must satisfy. The 'schemes' and 'ports' fields of UrlFilter are ignored for this event."
          }
        ],
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "properties": {
              "sourceTabId": {
                "type": "integer",
                "description": "The ID of the tab in which the navigation is triggered."
              },
              "sourceProcessId": {
                "type": "integer",
                "description": "The ID of the process that runs the renderer for the source frame."
              },
              "sourceFrameId": {
                "type": "integer",
                "description": "The ID of the frame with sourceTabId in which the navigation is triggered. 0 indicates the main frame."
              },
              "url": {
                "type": "string",
                "description": "The URL to be opened in the new window."
              },
              "tabId": {
                "type": "integer",
                "description": "The ID of the tab in which the url is opened"
              },
              "timeStamp": {
                "type": "number",
                "description": "The time when the browser was about to create a new view, in milliseconds since the epoch."
              }
            }
          }
        ]
      },
      {
        "name": "onReferenceFragmentUpdated",
        "type": "function",
        "description": "Fired when the reference fragment of a frame was updated. All future events for that frame will use the updated URL.",
        "filters": [
          {
            "name": "url",
            "type": "array",
            "items": {
              "$ref": "events.UrlFilter"
            },
            "description": "Conditions that the URL being navigated to must satisfy. The 'schemes' and 'ports' fields of UrlFilter are ignored for this event."
          }
        ],
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "properties": {
              "tabId": {
                "type": "integer",
                "description": "The ID of the tab in which the navigation occurs."
              },
              "url": {
                "type": "string"
              },
              "processId": {
                "type": "integer",
                "description": "The ID of the process that runs the renderer for this frame."
              },
              "frameId": {
                "type": "integer",
                "description": "0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique within a tab."
              },
              "transitionType": {
                "$ref": "TransitionType",
                "description": "Cause of the navigation."
              },
              "transitionQualifiers": {
                "type": "array",
                "description": "A list of transition qualifiers.",
                "items": {
                  "$ref": "TransitionQualifier"
                }
              },
              "timeStamp": {
                "type": "number",
                "description": "The time when the navigation was committed, in milliseconds since the epoch."
              }
            }
          }
        ]
      },
      {
        "name": "onTabReplaced",
        "type": "function",
        "description": "Fired when the contents of the tab is replaced by a different (usually previously pre-rendered) tab.",
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "properties": {
              "replacedTabId": {
                "type": "integer",
                "description": "The ID of the tab that was replaced."
              },
              "tabId": {
                "type": "integer",
                "description": "The ID of the tab that replaced the old tab."
              },
              "timeStamp": {
                "type": "number",
                "description": "The time when the replacement happened, in milliseconds since the epoch."
              }
            }
          }
        ]
      },
      {
        "name": "onHistoryStateUpdated",
        "type": "function",
        "description": "Fired when the frame's history was updated to a new URL. All future events for that frame will use the updated URL.",
        "filters": [
          {
            "name": "url",
            "type": "array",
            "items": {
              "$ref": "events.UrlFilter"
            },
            "description": "Conditions that the URL being navigated to must satisfy. The 'schemes' and 'ports' fields of UrlFilter are ignored for this event."
          }
        ],
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "properties": {
              "tabId": {
                "type": "integer",
                "description": "The ID of the tab in which the navigation occurs."
              },
              "url": {
                "type": "string"
              },
              "processId": {
                "type": "integer",
                "description": "The ID of the process that runs the renderer for this frame."
              },
              "frameId": {
                "type": "integer",
                "description": "0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique within a tab."
              },
              "transitionType": {
                "$ref": "TransitionType",
                "description": "Cause of the navigation."
              },
              "transitionQualifiers": {
                "type": "array",
                "description": "A list of transition qualifiers.",
                "items": {
                  "$ref": "TransitionQualifier"
                }
              },
              "timeStamp": {
                "type": "number",
                "description": "The time when the navigation was committed, in milliseconds since the epoch."
              }
            }
          }
        ]
      }
    ],
    "dependencies": [
      "permission:webNavigation"
    ]
  },
  {
    "namespace": "webRequest",
    "description": "Use the <code>chrome.webRequest</code> API to observe and analyze traffic and to intercept, block, or modify requests in-flight.",
    "properties": {
      "MAX_HANDLER_BEHAVIOR_CHANGED_CALLS_PER_10_MINUTES": {
        "value": 20,
        "description": "The maximum number of times that <code>handlerBehaviorChanged</code> can be called per 10 minute sustained interval. <code>handlerBehaviorChanged</code> is an expensive function call that shouldn't be called often."
      }
    },
    "types": [
      {
        "id": "ResourceType",
        "type": "string",
        "enum": [
          "main_frame",
          "sub_frame",
          "stylesheet",
          "script",
          "image",
          "font",
          "object",
          "xmlhttprequest",
          "ping",
          "other"
        ]
      },
      {
        "id": "OnBeforeRequestOptions",
        "type": "string",
        "enum": [
          "blocking",
          "requestBody"
        ]
      },
      {
        "id": "OnBeforeSendHeadersOptions",
        "type": "string",
        "enum": [
          "requestHeaders",
          "blocking"
        ]
      },
      {
        "id": "OnSendHeadersOptions",
        "type": "string",
        "enum": [
          "requestHeaders"
        ]
      },
      {
        "id": "OnHeadersReceivedOptions",
        "type": "string",
        "enum": [
          "blocking",
          "responseHeaders"
        ]
      },
      {
        "id": "OnAuthRequiredOptions",
        "type": "string",
        "enum": [
          "responseHeaders",
          "blocking",
          "asyncBlocking"
        ]
      },
      {
        "id": "OnResponseStartedOptions",
        "type": "string",
        "enum": [
          "responseHeaders"
        ]
      },
      {
        "id": "OnBeforeRedirectOptions",
        "type": "string",
        "enum": [
          "responseHeaders"
        ]
      },
      {
        "id": "OnCompletedOptions",
        "type": "string",
        "enum": [
          "responseHeaders"
        ]
      },
      {
        "id": "RequestFilter",
        "type": "object",
        "description": "An object describing filters to apply to webRequest events.",
        "properties": {
          "urls": {
            "type": "array",
            "description": "A list of URLs or URL patterns. Requests that cannot match any of the URLs will be filtered out.",
            "items": {
              "type": "string"
            }
          },
          "types": {
            "type": "array",
            "optional": true,
            "description": "A list of request types. Requests that cannot match any of the types will be filtered out.",
            "items": {
              "$ref": "ResourceType"
            }
          },
          "tabId": {
            "type": "integer",
            "optional": true
          },
          "windowId": {
            "type": "integer",
            "optional": true
          }
        }
      },
      {
        "id": "HttpHeaders",
        "nocompile": true,
        "type": "array",
        "description": "An array of HTTP headers. Each header is represented as a dictionary containing the keys <code>name</code> and either <code>value</code> or <code>binaryValue</code>.",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Name of the HTTP header."
            },
            "value": {
              "type": "string",
              "optional": true,
              "description": "Value of the HTTP header if it can be represented by UTF-8."
            },
            "binaryValue": {
              "type": "array",
              "optional": true,
              "description": "Value of the HTTP header if it cannot be represented by UTF-8, stored as individual byte values (0..255).",
              "items": {
                "type": "integer"
              }
            }
          }
        }
      },
      {
        "id": "BlockingResponse",
        "nocompile": true,
        "type": "object",
        "description": "Returns value for event handlers that have the 'blocking' extraInfoSpec applied. Allows the event handler to modify network requests.",
        "properties": {
          "cancel": {
            "type": "boolean",
            "optional": true,
            "description": "If true, the request is cancelled. Used in onBeforeRequest, this prevents the request from being sent."
          },
          "redirectUrl": {
            "type": "string",
            "optional": true,
            "description": "Only used as a response to the onBeforeRequest and onHeadersReceived events. If set, the original request is prevented from being sent/completed and is instead redirected to the given URL. Redirections to non-HTTP schemes such as data: are allowed. Redirects initiated by a redirect action use the original request method for the redirect, with one exception: If the redirect is initiated at the onHeadersReceived stage, then the redirect will be issued using the GET method."
          },
          "requestHeaders": {
            "$ref": "HttpHeaders",
            "optional": true,
            "description": "Only used as a response to the onBeforeSendHeaders event. If set, the request is made with these request headers instead."
          },
          "responseHeaders": {
            "$ref": "HttpHeaders",
            "optional": true,
            "description": "Only used as a response to the onHeadersReceived event. If set, the server is assumed to have responded with these response headers instead. Only return <code>responseHeaders</code> if you really want to modify the headers in order to limit the number of conflicts (only one extension may modify <code>responseHeaders</code> for each request)."
          },
          "authCredentials": {
            "type": "object",
            "description": "Only used as a response to the onAuthRequired event. If set, the request is made using the supplied credentials.",
            "optional": true,
            "properties": {
              "username": {
                "type": "string"
              },
              "password": {
                "type": "string"
              }
            }
          }
        }
      },
      {
        "id": "UploadData",
        "type": "object",
        "properties": {
          "bytes": {
            "type": "any",
            "optional": true,
            "description": "An ArrayBuffer with a copy of the data."
          },
          "file": {
            "type": "string",
            "optional": true,
            "description": "A string with the file's path and name."
          }
        },
        "description": "Contains data uploaded in a URL request."
      }
    ],
    "functions": [
      {
        "name": "handlerBehaviorChanged",
        "type": "function",
        "description": "Needs to be called when the behavior of the webRequest handlers has changed to prevent incorrect handling due to caching. This function call is expensive. Don't call it often.",
        "parameters": [
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": []
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onBeforeRequest",
        "type": "function",
        "description": "Fired when a request is about to occur.",
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "properties": {
              "requestId": {
                "type": "string",
                "description": "The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request."
              },
              "url": {
                "type": "string"
              },
              "method": {
                "type": "string",
                "description": "Standard HTTP method."
              },
              "frameId": {
                "type": "integer",
                "description": "The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (<code>type</code> is <code>main_frame</code> or <code>sub_frame</code>), <code>frameId</code> indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab."
              },
              "parentFrameId": {
                "type": "integer",
                "description": "ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists."
              },
              "requestBody": {
                "type": "object",
                "optional": true,
                "description": "Contains the HTTP request body data. Only provided if extraInfoSpec contains 'requestBody'.",
                "properties": {
                  "error": {
                    "type": "string",
                    "optional": true,
                    "description": "Errors when obtaining request body data."
                  },
                  "formData": {
                    "type": "object",
                    "optional": true,
                    "description": "If the request method is POST and the body is a sequence of key-value pairs encoded in UTF8, encoded as either multipart/form-data, or application/x-www-form-urlencoded, this dictionary is present and for each key contains the list of all values for that key. If the data is of another media type, or if it is malformed, the dictionary is not present. An example value of this dictionary is {'key': ['value1', 'value2']}.",
                    "properties": {},
                    "additionalProperties": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    }
                  },
                  "raw": {
                    "type": "array",
                    "optional": true,
                    "items": {
                      "$ref": "UploadData"
                    },
                    "description": "If the request method is PUT or POST, and the body is not already parsed in formData, then the unparsed request body elements are contained in this array."
                  }
                }
              },
              "tabId": {
                "type": "integer",
                "description": "The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab."
              },
              "type": {
                "$ref": "ResourceType",
                "description": "How the requested resource will be used."
              },
              "timeStamp": {
                "type": "number",
                "description": "The time when this signal is triggered, in milliseconds since the epoch."
              }
            }
          }
        ],
        "extraParameters": [
          {
            "$ref": "RequestFilter",
            "name": "filter",
            "description": "A set of filters that restricts the events that will be sent to this listener."
          },
          {
            "type": "array",
            "optional": true,
            "name": "extraInfoSpec",
            "description": "Array of extra information that should be passed to the listener function.",
            "items": {
              "$ref": "OnBeforeRequestOptions"
            }
          }
        ],
        "returns": {
          "$ref": "BlockingResponse",
          "description": "If \"blocking\" is specified in the \"extraInfoSpec\" parameter, the event listener should return an object of this type.",
          "optional": true
        }
      },
      {
        "name": "onBeforeSendHeaders",
        "nocompile": true,
        "type": "function",
        "description": "Fired before sending an HTTP request, once the request headers are available. This may occur after a TCP connection is made to the server, but before any HTTP data is sent. ",
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "properties": {
              "requestId": {
                "type": "string",
                "description": "The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request."
              },
              "url": {
                "type": "string"
              },
              "method": {
                "type": "string",
                "description": "Standard HTTP method."
              },
              "frameId": {
                "type": "integer",
                "description": "The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (<code>type</code> is <code>main_frame</code> or <code>sub_frame</code>), <code>frameId</code> indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab."
              },
              "parentFrameId": {
                "type": "integer",
                "description": "ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists."
              },
              "tabId": {
                "type": "integer",
                "description": "The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab."
              },
              "type": {
                "$ref": "ResourceType",
                "description": "How the requested resource will be used."
              },
              "timeStamp": {
                "type": "number",
                "description": "The time when this signal is triggered, in milliseconds since the epoch."
              },
              "requestHeaders": {
                "$ref": "HttpHeaders",
                "optional": true,
                "description": "The HTTP request headers that are going to be sent out with this request."
              }
            }
          }
        ],
        "extraParameters": [
          {
            "$ref": "RequestFilter",
            "name": "filter",
            "description": "A set of filters that restricts the events that will be sent to this listener."
          },
          {
            "type": "array",
            "optional": true,
            "name": "extraInfoSpec",
            "description": "Array of extra information that should be passed to the listener function.",
            "items": {
              "$ref": "OnBeforeSendHeadersOptions"
            }
          }
        ],
        "returns": {
          "$ref": "BlockingResponse",
          "description": "If \"blocking\" is specified in the \"extraInfoSpec\" parameter, the event listener should return an object of this type.",
          "optional": true
        }
      },
      {
        "name": "onSendHeaders",
        "nocompile": true,
        "type": "function",
        "description": "Fired just before a request is going to be sent to the server (modifications of previous onBeforeSendHeaders callbacks are visible by the time onSendHeaders is fired).",
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "properties": {
              "requestId": {
                "type": "string",
                "description": "The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request."
              },
              "url": {
                "type": "string"
              },
              "method": {
                "type": "string",
                "description": "Standard HTTP method."
              },
              "frameId": {
                "type": "integer",
                "description": "The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (<code>type</code> is <code>main_frame</code> or <code>sub_frame</code>), <code>frameId</code> indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab."
              },
              "parentFrameId": {
                "type": "integer",
                "description": "ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists."
              },
              "tabId": {
                "type": "integer",
                "description": "The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab."
              },
              "type": {
                "$ref": "ResourceType",
                "description": "How the requested resource will be used."
              },
              "timeStamp": {
                "type": "number",
                "description": "The time when this signal is triggered, in milliseconds since the epoch."
              },
              "requestHeaders": {
                "$ref": "HttpHeaders",
                "optional": true,
                "description": "The HTTP request headers that have been sent out with this request."
              }
            }
          }
        ],
        "extraParameters": [
          {
            "$ref": "RequestFilter",
            "name": "filter",
            "description": "A set of filters that restricts the events that will be sent to this listener."
          },
          {
            "type": "array",
            "optional": true,
            "name": "extraInfoSpec",
            "description": "Array of extra information that should be passed to the listener function.",
            "items": {
              "$ref": "OnSendHeadersOptions"
            }
          }
        ]
      },
      {
        "name": "onHeadersReceived",
        "nocompile": true,
        "type": "function",
        "description": "Fired when HTTP response headers of a request have been received.",
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "properties": {
              "requestId": {
                "type": "string",
                "description": "The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request."
              },
              "url": {
                "type": "string"
              },
              "method": {
                "type": "string",
                "description": "Standard HTTP method."
              },
              "frameId": {
                "type": "integer",
                "description": "The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (<code>type</code> is <code>main_frame</code> or <code>sub_frame</code>), <code>frameId</code> indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab."
              },
              "parentFrameId": {
                "type": "integer",
                "description": "ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists."
              },
              "tabId": {
                "type": "integer",
                "description": "The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab."
              },
              "type": {
                "$ref": "ResourceType",
                "description": "How the requested resource will be used."
              },
              "timeStamp": {
                "type": "number",
                "description": "The time when this signal is triggered, in milliseconds since the epoch."
              },
              "statusLine": {
                "type": "string",
                "description": "HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line)."
              },
              "responseHeaders": {
                "$ref": "HttpHeaders",
                "optional": true,
                "description": "The HTTP response headers that have been received with this response."
              },
              "statusCode": {
                "type": "integer",
                "description": "Standard HTTP status code returned by the server."
              }
            }
          }
        ],
        "extraParameters": [
          {
            "$ref": "RequestFilter",
            "name": "filter",
            "description": "A set of filters that restricts the events that will be sent to this listener."
          },
          {
            "type": "array",
            "optional": true,
            "name": "extraInfoSpec",
            "description": "Array of extra information that should be passed to the listener function.",
            "items": {
              "$ref": "OnHeadersReceivedOptions"
            }
          }
        ],
        "returns": {
          "$ref": "BlockingResponse",
          "description": "If \"blocking\" is specified in the \"extraInfoSpec\" parameter, the event listener should return an object of this type.",
          "optional": true
        }
      },
      {
        "name": "onAuthRequired",
        "nocompile": true,
        "type": "function",
        "description": "Fired when an authentication failure is received. The listener has three options: it can provide authentication credentials, it can cancel the request and display the error page, or it can take no action on the challenge. If bad user credentials are provided, this may be called multiple times for the same request.",
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "properties": {
              "requestId": {
                "type": "string",
                "description": "The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request."
              },
              "url": {
                "type": "string"
              },
              "method": {
                "type": "string",
                "description": "Standard HTTP method."
              },
              "frameId": {
                "type": "integer",
                "description": "The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (<code>type</code> is <code>main_frame</code> or <code>sub_frame</code>), <code>frameId</code> indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab."
              },
              "parentFrameId": {
                "type": "integer",
                "description": "ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists."
              },
              "tabId": {
                "type": "integer",
                "description": "The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab."
              },
              "type": {
                "$ref": "ResourceType",
                "description": "How the requested resource will be used."
              },
              "timeStamp": {
                "type": "number",
                "description": "The time when this signal is triggered, in milliseconds since the epoch."
              },
              "scheme": {
                "type": "string",
                "description": "The authentication scheme, e.g. Basic or Digest."
              },
              "realm": {
                "type": "string",
                "description": "The authentication realm provided by the server, if there is one.",
                "optional": true
              },
              "challenger": {
                "type": "object",
                "description": "The server requesting authentication.",
                "properties": {
                  "host": {
                    "type": "string"
                  },
                  "port": {
                    "type": "integer"
                  }
                }
              },
              "isProxy": {
                "type": "boolean",
                "description": "True for Proxy-Authenticate, false for WWW-Authenticate."
              },
              "responseHeaders": {
                "$ref": "HttpHeaders",
                "optional": true,
                "description": "The HTTP response headers that were received along with this response."
              },
              "statusLine": {
                "type": "string",
                "description": "HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line) or an empty string if there are no headers."
              },
              "statusCode": {
                "type": "integer",
                "description": "Standard HTTP status code returned by the server."
              }
            }
          },
          {
            "type": "function",
            "optional": true,
            "name": "callback",
            "parameters": [
              {
                "name": "response",
                "$ref": "BlockingResponse"
              }
            ]
          }
        ],
        "extraParameters": [
          {
            "$ref": "RequestFilter",
            "name": "filter",
            "description": "A set of filters that restricts the events that will be sent to this listener."
          },
          {
            "type": "array",
            "optional": true,
            "name": "extraInfoSpec",
            "description": "Array of extra information that should be passed to the listener function.",
            "items": {
              "$ref": "OnAuthRequiredOptions"
            }
          }
        ],
        "returns": {
          "$ref": "BlockingResponse",
          "description": "If \"blocking\" is specified in the \"extraInfoSpec\" parameter, the event listener should return an object of this type.",
          "optional": true
        }
      },
      {
        "name": "onResponseStarted",
        "nocompile": true,
        "type": "function",
        "description": "Fired when the first byte of the response body is received. For HTTP requests, this means that the status line and response headers are available.",
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "properties": {
              "requestId": {
                "type": "string",
                "description": "The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request."
              },
              "url": {
                "type": "string"
              },
              "method": {
                "type": "string",
                "description": "Standard HTTP method."
              },
              "frameId": {
                "type": "integer",
                "description": "The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (<code>type</code> is <code>main_frame</code> or <code>sub_frame</code>), <code>frameId</code> indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab."
              },
              "parentFrameId": {
                "type": "integer",
                "description": "ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists."
              },
              "tabId": {
                "type": "integer",
                "description": "The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab."
              },
              "type": {
                "$ref": "ResourceType",
                "description": "How the requested resource will be used."
              },
              "timeStamp": {
                "type": "number",
                "description": "The time when this signal is triggered, in milliseconds since the epoch."
              },
              "ip": {
                "type": "string",
                "optional": true,
                "description": "The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address."
              },
              "fromCache": {
                "type": "boolean",
                "description": "Indicates if this response was fetched from disk cache."
              },
              "statusCode": {
                "type": "integer",
                "description": "Standard HTTP status code returned by the server."
              },
              "responseHeaders": {
                "$ref": "HttpHeaders",
                "optional": true,
                "description": "The HTTP response headers that were received along with this response."
              },
              "statusLine": {
                "type": "string",
                "description": "HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line) or an empty string if there are no headers."
              }
            }
          }
        ],
        "extraParameters": [
          {
            "$ref": "RequestFilter",
            "name": "filter",
            "description": "A set of filters that restricts the events that will be sent to this listener."
          },
          {
            "type": "array",
            "optional": true,
            "name": "extraInfoSpec",
            "description": "Array of extra information that should be passed to the listener function.",
            "items": {
              "$ref": "OnResponseStartedOptions"
            }
          }
        ]
      },
      {
        "name": "onBeforeRedirect",
        "type": "function",
        "nocompile": true,
        "description": "Fired when a server-initiated redirect is about to occur.",
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "properties": {
              "requestId": {
                "type": "string",
                "description": "The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request."
              },
              "url": {
                "type": "string"
              },
              "method": {
                "type": "string",
                "description": "Standard HTTP method."
              },
              "frameId": {
                "type": "integer",
                "description": "The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (<code>type</code> is <code>main_frame</code> or <code>sub_frame</code>), <code>frameId</code> indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab."
              },
              "parentFrameId": {
                "type": "integer",
                "description": "ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists."
              },
              "tabId": {
                "type": "integer",
                "description": "The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab."
              },
              "type": {
                "$ref": "ResourceType",
                "description": "How the requested resource will be used."
              },
              "timeStamp": {
                "type": "number",
                "description": "The time when this signal is triggered, in milliseconds since the epoch."
              },
              "ip": {
                "type": "string",
                "optional": true,
                "description": "The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address."
              },
              "fromCache": {
                "type": "boolean",
                "description": "Indicates if this response was fetched from disk cache."
              },
              "statusCode": {
                "type": "integer",
                "description": "Standard HTTP status code returned by the server."
              },
              "redirectUrl": {
                "type": "string",
                "description": "The new URL."
              },
              "responseHeaders": {
                "$ref": "HttpHeaders",
                "optional": true,
                "description": "The HTTP response headers that were received along with this redirect."
              },
              "statusLine": {
                "type": "string",
                "description": "HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line) or an empty string if there are no headers."
              }
            }
          }
        ],
        "extraParameters": [
          {
            "$ref": "RequestFilter",
            "name": "filter",
            "description": "A set of filters that restricts the events that will be sent to this listener."
          },
          {
            "type": "array",
            "optional": true,
            "name": "extraInfoSpec",
            "description": "Array of extra information that should be passed to the listener function.",
            "items": {
              "$ref": "OnBeforeRedirectOptions"
            }
          }
        ]
      },
      {
        "name": "onCompleted",
        "type": "function",
        "nocompile": true,
        "description": "Fired when a request is completed.",
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "properties": {
              "requestId": {
                "type": "string",
                "description": "The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request."
              },
              "url": {
                "type": "string"
              },
              "method": {
                "type": "string",
                "description": "Standard HTTP method."
              },
              "frameId": {
                "type": "integer",
                "description": "The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (<code>type</code> is <code>main_frame</code> or <code>sub_frame</code>), <code>frameId</code> indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab."
              },
              "parentFrameId": {
                "type": "integer",
                "description": "ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists."
              },
              "tabId": {
                "type": "integer",
                "description": "The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab."
              },
              "type": {
                "$ref": "ResourceType",
                "description": "How the requested resource will be used."
              },
              "timeStamp": {
                "type": "number",
                "description": "The time when this signal is triggered, in milliseconds since the epoch."
              },
              "ip": {
                "type": "string",
                "optional": true,
                "description": "The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address."
              },
              "fromCache": {
                "type": "boolean",
                "description": "Indicates if this response was fetched from disk cache."
              },
              "statusCode": {
                "type": "integer",
                "description": "Standard HTTP status code returned by the server."
              },
              "responseHeaders": {
                "$ref": "HttpHeaders",
                "optional": true,
                "description": "The HTTP response headers that were received along with this response."
              },
              "statusLine": {
                "type": "string",
                "description": "HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line) or an empty string if there are no headers."
              }
            }
          }
        ],
        "extraParameters": [
          {
            "$ref": "RequestFilter",
            "name": "filter",
            "description": "A set of filters that restricts the events that will be sent to this listener."
          },
          {
            "type": "array",
            "optional": true,
            "name": "extraInfoSpec",
            "description": "Array of extra information that should be passed to the listener function.",
            "items": {
              "$ref": "OnCompletedOptions"
            }
          }
        ]
      },
      {
        "name": "onErrorOccurred",
        "type": "function",
        "description": "Fired when an error occurs.",
        "parameters": [
          {
            "type": "object",
            "name": "details",
            "properties": {
              "requestId": {
                "type": "string",
                "description": "The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request."
              },
              "url": {
                "type": "string"
              },
              "method": {
                "type": "string",
                "description": "Standard HTTP method."
              },
              "frameId": {
                "type": "integer",
                "description": "The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (<code>type</code> is <code>main_frame</code> or <code>sub_frame</code>), <code>frameId</code> indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab."
              },
              "parentFrameId": {
                "type": "integer",
                "description": "ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists."
              },
              "tabId": {
                "type": "integer",
                "description": "The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab."
              },
              "type": {
                "$ref": "ResourceType",
                "description": "How the requested resource will be used."
              },
              "timeStamp": {
                "type": "number",
                "description": "The time when this signal is triggered, in milliseconds since the epoch."
              },
              "ip": {
                "type": "string",
                "optional": true,
                "description": "The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address."
              },
              "fromCache": {
                "type": "boolean",
                "description": "Indicates if this response was fetched from disk cache."
              },
              "error": {
                "type": "string",
                "description": "The error description. This string is <em>not</em> guaranteed to remain backwards compatible between releases. You must not parse and act based upon its content."
              }
            }
          }
        ],
        "extraParameters": [
          {
            "$ref": "RequestFilter",
            "name": "filter",
            "description": "A set of filters that restricts the events that will be sent to this listener."
          }
        ]
      }
    ],
    "dependencies": [
      "permission:webRequest"
    ]
  },
  {
    "namespace": "webstore",
    "description": "Use the <code>chrome.webstore</code> API to initiate app and extension installations \"inline\" from your site.",
    "types": [
      {
        "id": "InstallStage",
        "type": "string",
        "enum": [
          "installing",
          "downloading"
        ],
        "description": "Enum used to indicate the stage of the installation process. 'downloading' indicates that the necessary files are being downloaded, and 'installing' indicates that the files are downloaded and are being actively installed."
      },
      {
        "id": "ErrorCode",
        "type": "string",
        "description": "Enum of the possible install results, including error codes sent back in the event that an inline installation has failed.",
        "enum": [
          {
            "description": "An uncommon, unrecognized, or unexpected error. In some cases, the readable error string can provide more information.",
            "name": "otherError"
          },
          {
            "description": "The operation was aborted as the requestor is no longer alive.",
            "name": "aborted"
          },
          {
            "description": "An installation of the same extension is in progress.",
            "name": "installInProgress"
          },
          {
            "description": "The installation is not permitted.",
            "name": "notPermitted"
          },
          {
            "description": "Invalid Chrome Web Store item ID.",
            "name": "invalidId"
          },
          {
            "description": "Failed to retrieve extension metadata from the Web Store.",
            "name": "webstoreRequestError"
          },
          {
            "description": "The extension metadata retrieved from the Web Store was invalid.",
            "name": "invalidWebstoreResponse"
          },
          {
            "description": "An error occurred while parsing the extension manifest retrieved from the Web Store.",
            "name": "invalidManifest"
          },
          {
            "description": "Failed to retrieve the extension's icon from the Web Store, or the icon was invalid.",
            "name": "iconError"
          },
          {
            "description": "The user canceled the operation.",
            "name": "userCanceled"
          },
          {
            "description": "The extension is blacklisted.",
            "name": "blacklisted"
          },
          {
            "description": "Unsatisfied dependencies, such as shared modules.",
            "name": "missingDependencies"
          },
          {
            "description": "Unsatisfied requirements, such as webgl.",
            "name": "requirementViolations"
          },
          {
            "description": "The extension is blocked by management policies.",
            "name": "blockedByPolicy"
          },
          {
            "description": "The launch feature is not available.",
            "name": "launchFeatureDisabled"
          },
          {
            "description": "The launch feature is not supported for the extension type.",
            "name": "launchUnsupportedExtensionType"
          },
          {
            "description": "A launch of the same extension is in progress.",
            "name": "launchInProgress"
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onInstallStageChanged",
        "description": "Fired when an inline installation enters a new InstallStage. In order to receive notifications about this event, listeners must be registered before the inline installation begins.",
        "type": "function",
        "parameters": [
          {
            "name": "stage",
            "$ref": "InstallStage",
            "description": "The InstallStage that just began."
          }
        ]
      },
      {
        "name": "onDownloadProgress",
        "description": "Fired periodically with the download progress of an inline install. In order to receive notifications about this event, listeners must be registered before the inline installation begins.",
        "type": "function",
        "parameters": [
          {
            "name": "percentDownloaded",
            "type": "number",
            "description": "The progress of the download, between 0 and 1. 0 indicates no progress; 1.0 indicates complete."
          }
        ]
      }
    ],
    "functions": [
      {
        "name": "install",
        "allowAmbiguousOptionalArguments": true,
        "parameters": [
          {
            "name": "url",
            "type": "string",
            "optional": true,
            "description": "If you have more than one <code>&lt;link&gt;</code> tag on your page with the <code>chrome-webstore-item</code> relation, you can choose which item you'd like to install by passing in its URL here. If it is omitted, then the first (or only) link will be used. An exception will be thrown if the passed in URL does not exist on the page."
          },
          {
            "name": "successCallback",
            "type": "function",
            "optional": true,
            "parameters": [],
            "description": "This function is invoked when inline installation successfully completes (after the dialog is shown and the user agrees to add the item to Chrome). You may wish to use this to hide the user interface element that prompted the user to install the app or extension."
          },
          {
            "name": "failureCallback",
            "type": "function",
            "optional": true,
            "parameters": [
              {
                "name": "error",
                "type": "string",
                "description": "The failure detail. You may wish to inspect or log this for debugging purposes, but you should not rely on specific strings being passed back."
              },
              {
                "name": "errorCode",
                "$ref": "ErrorCode",
                "optional": "true",
                "description": "The error code from the stable set of possible errors."
              }
            ],
            "description": "This function is invoked when inline installation does not successfully complete. Possible reasons for this include the user canceling the dialog, the linked item not being found in the store, or the install being initiated from a non-verified site."
          }
        ]
      }
    ]
  },
  {
    "namespace": "windows",
    "description": "Use the <code>chrome.windows</code> API to interact with browser windows. You can use this API to create, modify, and rearrange windows in the browser.",
    "compiler_options": {
      "implemented_in": "chrome/browser/extensions/api/tabs/tabs_api.h"
    },
    "types": [
      {
        "id": "WindowType",
        "type": "string",
        "description": "The type of browser window this is. Under some circumstances a Window may not be assigned type property, for example when querying closed windows from the $(ref:sessions) API.",
        "enum": [
          "normal",
          "popup",
          "panel",
          "app",
          "devtools"
        ]
      },
      {
        "id": "WindowState",
        "type": "string",
        "description": "The state of this browser window. Under some circumstances a Window may not be assigned state property, for example when querying closed windows from the $(ref:sessions) API.",
        "enum": [
          "normal",
          "minimized",
          "maximized",
          "fullscreen",
          "docked"
        ]
      },
      {
        "id": "Window",
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "optional": true,
            "minimum": 0,
            "description": "The ID of the window. Window IDs are unique within a browser session. Under some circumstances a Window may not be assigned an ID, for example when querying windows using the $(ref:sessions) API, in which case a session ID may be present."
          },
          "focused": {
            "type": "boolean",
            "description": "Whether the window is currently the focused window."
          },
          "top": {
            "type": "integer",
            "optional": true,
            "description": "The offset of the window from the top edge of the screen in pixels. Under some circumstances a Window may not be assigned top property, for example when querying closed windows from the $(ref:sessions) API."
          },
          "left": {
            "type": "integer",
            "optional": true,
            "description": "The offset of the window from the left edge of the screen in pixels. Under some circumstances a Window may not be assigned left property, for example when querying closed windows from the $(ref:sessions) API."
          },
          "width": {
            "type": "integer",
            "optional": true,
            "description": "The width of the window, including the frame, in pixels. Under some circumstances a Window may not be assigned width property, for example when querying closed windows from the $(ref:sessions) API."
          },
          "height": {
            "type": "integer",
            "optional": true,
            "description": "The height of the window, including the frame, in pixels. Under some circumstances a Window may not be assigned height property, for example when querying closed windows from the $(ref:sessions) API."
          },
          "tabs": {
            "type": "array",
            "items": {
              "$ref": "tabs.Tab"
            },
            "optional": true,
            "description": "Array of $(ref:tabs.Tab) objects representing the current tabs in the window."
          },
          "incognito": {
            "type": "boolean",
            "description": "Whether the window is incognito."
          },
          "type": {
            "$ref": "WindowType",
            "optional": true,
            "description": "The type of browser window this is."
          },
          "state": {
            "$ref": "WindowState",
            "optional": true,
            "description": "The state of this browser window."
          },
          "alwaysOnTop": {
            "type": "boolean",
            "description": "Whether the window is set to be always on top."
          },
          "sessionId": {
            "type": "string",
            "optional": true,
            "description": "The session ID used to uniquely identify a Window obtained from the $(ref:sessions) API."
          }
        }
      },
      {
        "id": "CreateType",
        "type": "string",
        "description": "Specifies what type of browser window to create. The 'panel' and 'detached_panel' types create a popup unless the '--enable-panels' flag is set.",
        "enum": [
          "normal",
          "popup",
          "panel",
          "detached_panel"
        ]
      }
    ],
    "properties": {
      "WINDOW_ID_NONE": {
        "value": -1,
        "description": "The windowId value that represents the absence of a chrome browser window."
      },
      "WINDOW_ID_CURRENT": {
        "value": -2,
        "description": "The windowId value that represents the <a href='windows#current-window'>current window</a>."
      }
    },
    "functions": [
      {
        "name": "get",
        "type": "function",
        "description": "Gets details about a window.",
        "parameters": [
          {
            "type": "integer",
            "name": "windowId",
            "minimum": -2
          },
          {
            "type": "object",
            "name": "getInfo",
            "optional": true,
            "description": "",
            "properties": {
              "populate": {
                "type": "boolean",
                "optional": true,
                "description": "If true, the $(ref:windows.Window) object will have a <var>tabs</var> property that contains a list of the $(ref:tabs.Tab) objects. The <code>Tab</code> objects only contain the <code>url</code>, <code>title</code> and <code>favIconUrl</code> properties if the extension's manifest file includes the <code>\"tabs\"</code> permission."
              },
              "windowTypes": {
                "type": "array",
                "items": {
                  "$ref": "WindowType"
                },
                "optional": true,
                "description": "If set, the $(ref:windows.Window) returned will be filtered based on its type. If unset the default filter is set to <code>['app', 'normal', 'panel', 'popup']</code>, with <code>'app'</code> and <code>'panel'</code> window types limited to the extension's own windows."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "window",
                "$ref": "Window"
              }
            ]
          }
        ]
      },
      {
        "name": "getCurrent",
        "type": "function",
        "description": "Gets the <a href='#current-window'>current window</a>.",
        "parameters": [
          {
            "type": "object",
            "name": "getInfo",
            "optional": true,
            "description": "",
            "properties": {
              "populate": {
                "type": "boolean",
                "optional": true,
                "description": "If true, the $(ref:windows.Window) object will have a <var>tabs</var> property that contains a list of the $(ref:tabs.Tab) objects. The <code>Tab</code> objects only contain the <code>url</code>, <code>title</code> and <code>favIconUrl</code> properties if the extension's manifest file includes the <code>\"tabs\"</code> permission."
              },
              "windowTypes": {
                "type": "array",
                "items": {
                  "$ref": "WindowType"
                },
                "optional": true,
                "description": "If set, the $(ref:windows.Window) returned will be filtered based on its type. If unset the default filter is set to <code>['app', 'normal', 'panel', 'popup']</code>, with <code>'app'</code> and <code>'panel'</code> window types limited to the extension's own windows."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "window",
                "$ref": "Window"
              }
            ]
          }
        ]
      },
      {
        "name": "getLastFocused",
        "type": "function",
        "description": "Gets the window that was most recently focused &mdash; typically the window 'on top'.",
        "parameters": [
          {
            "type": "object",
            "name": "getInfo",
            "optional": true,
            "description": "",
            "properties": {
              "populate": {
                "type": "boolean",
                "optional": true,
                "description": "If true, the $(ref:windows.Window) object will have a <var>tabs</var> property that contains a list of the $(ref:tabs.Tab) objects. The <code>Tab</code> objects only contain the <code>url</code>, <code>title</code> and <code>favIconUrl</code> properties if the extension's manifest file includes the <code>\"tabs\"</code> permission."
              },
              "windowTypes": {
                "type": "array",
                "items": {
                  "$ref": "WindowType"
                },
                "optional": true,
                "description": "If set, the $(ref:windows.Window) returned will be filtered based on its type. If unset the default filter is set to <code>['app', 'normal', 'panel', 'popup']</code>, with <code>'app'</code> and <code>'panel'</code> window types limited to the extension's own windows."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "window",
                "$ref": "Window"
              }
            ]
          }
        ]
      },
      {
        "name": "getAll",
        "type": "function",
        "description": "Gets all windows.",
        "parameters": [
          {
            "type": "object",
            "name": "getInfo",
            "optional": true,
            "description": "",
            "properties": {
              "populate": {
                "type": "boolean",
                "optional": true,
                "description": "If true, each $(ref:windows.Window) object will have a <var>tabs</var> property that contains a list of the $(ref:tabs.Tab) objects for that window. The <code>Tab</code> objects only contain the <code>url</code>, <code>title</code> and <code>favIconUrl</code> properties if the extension's manifest file includes the <code>\"tabs\"</code> permission."
              },
              "windowTypes": {
                "type": "array",
                "items": {
                  "$ref": "WindowType"
                },
                "optional": true,
                "description": "If set, the $(ref:windows.Window) returned will be filtered based on its type. If unset the default filter is set to <code>['app', 'normal', 'panel', 'popup']</code>, with <code>'app'</code> and <code>'panel'</code> window types limited to the extension's own windows."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "name": "windows",
                "type": "array",
                "items": {
                  "$ref": "Window"
                }
              }
            ]
          }
        ]
      },
      {
        "name": "create",
        "type": "function",
        "description": "Creates (opens) a new browser with any optional sizing, position or default URL provided.",
        "parameters": [
          {
            "type": "object",
            "name": "createData",
            "properties": {
              "url": {
                "description": "A URL or array of URLs to open as tabs in the window. Fully-qualified URLs must include a scheme (i.e. 'http://www.google.com', not 'www.google.com'). Relative URLs will be relative to the current page within the extension. Defaults to the New Tab Page.",
                "optional": true,
                "choices": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                ]
              },
              "tabId": {
                "type": "integer",
                "minimum": 0,
                "optional": true,
                "description": "The id of the tab for which you want to adopt to the new window."
              },
              "left": {
                "type": "integer",
                "optional": true,
                "description": "The number of pixels to position the new window from the left edge of the screen. If not specified, the new window is offset naturally from the last focused window. This value is ignored for panels."
              },
              "top": {
                "type": "integer",
                "optional": true,
                "description": "The number of pixels to position the new window from the top edge of the screen. If not specified, the new window is offset naturally from the last focused window. This value is ignored for panels."
              },
              "width": {
                "type": "integer",
                "minimum": 0,
                "optional": true,
                "description": "The width in pixels of the new window, including the frame. If not specified defaults to a natural width."
              },
              "height": {
                "type": "integer",
                "minimum": 0,
                "optional": true,
                "description": "The height in pixels of the new window, including the frame. If not specified defaults to a natural height."
              },
              "focused": {
                "type": "boolean",
                "optional": true,
                "description": "If true, opens an active window. If false, opens an inactive window."
              },
              "incognito": {
                "type": "boolean",
                "optional": true,
                "description": "Whether the new window should be an incognito window."
              },
              "type": {
                "$ref": "CreateType",
                "optional": true,
                "description": "Specifies what type of browser window to create. The 'panel' and 'detached_panel' types create a popup unless the '--enable-panels' flag is set."
              },
              "state": {
                "$ref": "WindowState",
                "optional": true,
                "description": "The initial state of the window. The 'minimized', 'maximized' and 'fullscreen' states cannot be combined with 'left', 'top', 'width' or 'height'."
              }
            },
            "optional": true
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": [
              {
                "name": "window",
                "$ref": "Window",
                "description": "Contains details about the created window.",
                "optional": true
              }
            ]
          }
        ]
      },
      {
        "name": "update",
        "type": "function",
        "description": "Updates the properties of a window. Specify only the properties that you want to change; unspecified properties will be left unchanged.",
        "parameters": [
          {
            "type": "integer",
            "name": "windowId",
            "minimum": -2
          },
          {
            "type": "object",
            "name": "updateInfo",
            "properties": {
              "left": {
                "type": "integer",
                "optional": true,
                "description": "The offset from the left edge of the screen to move the window to in pixels. This value is ignored for panels."
              },
              "top": {
                "type": "integer",
                "optional": true,
                "description": "The offset from the top edge of the screen to move the window to in pixels. This value is ignored for panels."
              },
              "width": {
                "type": "integer",
                "minimum": 0,
                "optional": true,
                "description": "The width to resize the window to in pixels. This value is ignored for panels."
              },
              "height": {
                "type": "integer",
                "minimum": 0,
                "optional": true,
                "description": "The height to resize the window to in pixels. This value is ignored for panels."
              },
              "focused": {
                "type": "boolean",
                "optional": true,
                "description": "If true, brings the window to the front. If false, brings the next window in the z-order to the front."
              },
              "drawAttention": {
                "type": "boolean",
                "optional": true,
                "description": "If true, causes the window to be displayed in a manner that draws the user's attention to the window, without changing the focused window. The effect lasts until the user changes focus to the window. This option has no effect if the window already has focus. Set to false to cancel a previous draw attention request."
              },
              "state": {
                "$ref": "WindowState",
                "optional": true,
                "description": "The new state of the window. The 'minimized', 'maximized' and 'fullscreen' states cannot be combined with 'left', 'top', 'width' or 'height'."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": [
              {
                "name": "window",
                "$ref": "Window"
              }
            ]
          }
        ]
      },
      {
        "name": "remove",
        "type": "function",
        "description": "Removes (closes) a window, and all the tabs inside it.",
        "parameters": [
          {
            "type": "integer",
            "name": "windowId",
            "minimum": 0
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "parameters": []
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onCreated",
        "type": "function",
        "description": "Fired when a window is created.",
        "filters": [
          {
            "name": "windowTypes",
            "type": "array",
            "items": {
              "$ref": "WindowType"
            },
            "description": "Conditions that the window's type being created must satisfy. By default it will satisfy <code>['app', 'normal', 'panel', 'popup']</code>, with <code>'app'</code> and <code>'panel'</code> window types limited to the extension's own windows."
          }
        ],
        "parameters": [
          {
            "$ref": "Window",
            "name": "window",
            "description": "Details of the window that was created."
          }
        ]
      },
      {
        "name": "onRemoved",
        "type": "function",
        "description": "Fired when a window is removed (closed).",
        "filters": [
          {
            "name": "windowTypes",
            "type": "array",
            "items": {
              "$ref": "WindowType"
            },
            "description": "Conditions that the window's type being removed must satisfy. By default it will satisfy <code>['app', 'normal', 'panel', 'popup']</code>, with <code>'app'</code> and <code>'panel'</code> window types limited to the extension's own windows."
          }
        ],
        "parameters": [
          {
            "type": "integer",
            "name": "windowId",
            "minimum": 0,
            "description": "ID of the removed window."
          }
        ]
      },
      {
        "name": "onFocusChanged",
        "type": "function",
        "description": "Fired when the currently focused window changes. Will be chrome.windows.WINDOW_ID_NONE if all chrome windows have lost focus. Note: On some Linux window managers, WINDOW_ID_NONE will always be sent immediately preceding a switch from one chrome window to another.",
        "filters": [
          {
            "name": "windowTypes",
            "type": "array",
            "items": {
              "$ref": "WindowType"
            },
            "description": "Conditions that the window's type being removed must satisfy. By default it will satisfy <code>['app', 'normal', 'panel', 'popup']</code>, with <code>'app'</code> and <code>'panel'</code> window types limited to the extension's own windows."
          }
        ],
        "parameters": [
          {
            "type": "integer",
            "name": "windowId",
            "minimum": -1,
            "description": "ID of the newly focused window."
          }
        ]
      }
    ],
    "dependencies": [
      "api:tabs"
    ]
  },
  {
    "namespace": "accessibilityFeatures",
    "description": "Use the <code>chrome.accessibilityFeatures</code> API to manage Chrome's accessibility features. This API relies on the <a href='types#ChromeSetting'>ChromeSetting prototype of the type API</a> for getting and setting individual accessibility features. In order to get feature states the extension must request <code>accessibilityFeatures.read</code> permission. For modifying feature state, the extension needs <code>accessibilityFeatures.modify</code> permission. Note that <code>accessibilityFeatures.modify</code> does not imply <code>accessibilityFeatures.read</code> permission.",
    "properties": {
      "spokenFeedback": {
        "$ref": "types.ChromeSetting",
        "description": "<p><strong>ChromeOS only.</strong></p><p>Spoken feedback (text-to-speech). The value indicates whether the feature is enabled or not. <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.</p>",
        "value": [
          "spokenFeedback",
          {
            "type": "boolean"
          }
        ],
        "platforms": [
          "chromeos"
        ]
      },
      "largeCursor": {
        "$ref": "types.ChromeSetting",
        "description": "<p><strong>ChromeOS only.</strong></p><p>Enlarged cursor. The value indicates whether the feature is enabled or not. <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.</p>",
        "value": [
          "largeCursor",
          {
            "type": "boolean"
          }
        ],
        "platforms": [
          "chromeos"
        ]
      },
      "stickyKeys": {
        "$ref": "types.ChromeSetting",
        "description": "<p><strong>ChromeOS only.</strong></p><p>Sticky modifier keys (like shift or alt). The value indicates whether the feature is enabled or not. <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.</p>",
        "value": [
          "stickyKeys",
          {
            "type": "boolean"
          }
        ],
        "platforms": [
          "chromeos"
        ]
      },
      "highContrast": {
        "$ref": "types.ChromeSetting",
        "description": "<p><strong>ChromeOS only.</strong></p><p>High contrast rendering mode. The value indicates whether the feature is enabled or not. <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.</p>",
        "value": [
          "highContrast",
          {
            "type": "boolean"
          }
        ],
        "platforms": [
          "chromeos"
        ]
      },
      "screenMagnifier": {
        "$ref": "types.ChromeSetting",
        "description": "<p><strong>ChromeOS only.</strong></p><p>Full screen magnification. The value indicates whether the feature is enabled or not. <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.</p>",
        "value": [
          "screenMagnifier",
          {
            "type": "boolean"
          }
        ],
        "platforms": [
          "chromeos"
        ]
      },
      "autoclick": {
        "$ref": "types.ChromeSetting",
        "description": "<p><strong>ChromeOS only.</strong></p><p>Auto mouse click after mouse stops moving. The value indicates whether the feature is enabled or not. <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.</p>",
        "value": [
          "autoclick",
          {
            "type": "boolean"
          }
        ],
        "platforms": [
          "chromeos"
        ]
      },
      "virtualKeyboard": {
        "$ref": "types.ChromeSetting",
        "description": "<p><strong>ChromeOS only.</strong></p><p>Virtual on-screen keyboard. The value indicates whether the feature is enabled or not. <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.</p>",
        "value": [
          "virtualKeyboard",
          {
            "type": "boolean"
          }
        ],
        "platforms": [
          "chromeos"
        ]
      },
      "caretHighlight": {
        "$ref": "types.ChromeSetting",
        "description": "<p><strong>ChromeOS only.</strong></p><p>Caret highlighting. The value indicates whether the feature is enabled or not. <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.</p>",
        "value": [
          "caretHighlight",
          {
            "type": "boolean"
          }
        ],
        "platforms": [
          "chromeos"
        ]
      },
      "cursorHighlight": {
        "$ref": "types.ChromeSetting",
        "description": "<p><strong>ChromeOS only.</strong></p><p>Cursor highlighting. The value indicates whether the feature is enabled or not. <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.</p>",
        "value": [
          "cursorHighlight",
          {
            "type": "boolean"
          }
        ],
        "platforms": [
          "chromeos"
        ]
      },
      "focusHighlight": {
        "$ref": "types.ChromeSetting",
        "description": "<p><strong>ChromeOS only.</strong></p><p>Focus highlighting. The value indicates whether the feature is enabled or not. <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.</p>",
        "value": [
          "focusHighlight",
          {
            "type": "boolean"
          }
        ],
        "platforms": [
          "chromeos"
        ]
      },
      "selectToSpeak": {
        "$ref": "types.ChromeSetting",
        "description": "<p><strong>ChromeOS only.</strong></p><p>Select-to-speak. The value indicates whether the feature is enabled or not. <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.</p>",
        "value": [
          "selectToSpeak",
          {
            "type": "boolean"
          }
        ],
        "platforms": [
          "chromeos"
        ]
      },
      "switchAccess": {
        "$ref": "types.ChromeSetting",
        "description": "<p><strong>ChromeOS only.</strong></p><p>Switch access. The value indicates whether the feature is enabled or not. <code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.</p>",
        "value": [
          "switchAccess",
          {
            "type": "boolean"
          }
        ],
        "platforms": [
          "chromeos"
        ]
      },
      "animationPolicy": {
        "$ref": "types.ChromeSetting",
        "description": "<code>get()</code> requires <code>accessibilityFeatures.read</code> permission. <code>set()</code> and <code>clear()</code> require <code>accessibilityFeatures.modify</code> permission.",
        "value": [
          "animationPolicy",
          {
            "type": "string",
            "enum": [
              {
                "description": "Images are allowed to animate.",
                "name": "allowed"
              },
              {
                "description": "Images are animated once.",
                "name": "once"
              },
              {
                "description": "Images are not animated.",
                "name": "none"
              }
            ]
          }
        ]
      }
    }
  },
  {
    "types": [
      {
        "id": "Hash",
        "type": "string",
        "enum": [
          "MD5_SHA1",
          "SHA1",
          "SHA256",
          "SHA384",
          "SHA512"
        ]
      },
      {
        "id": "CertificateInfo",
        "type": "object",
        "properties": {
          "certificate": {
            "$ref": "ArrayBuffer"
          },
          "supportedHashes": {
            "type": "array",
            "items": {
              "$ref": "Hash"
            }
          }
        }
      },
      {
        "id": "SignRequest",
        "type": "object",
        "properties": {
          "digest": {
            "$ref": "ArrayBuffer"
          },
          "hash": {
            "$ref": "Hash"
          },
          "certificate": {
            "$ref": "ArrayBuffer"
          }
        }
      }
    ],
    "events": [
      {
        "name": "onCertificatesRequested",
        "type": "function",
        "parameters": [
          {
            "optional": false,
            "name": "reportCallback",
            "type": "function",
            "parameters": [
              {
                "type": "array",
                "items": {
                  "$ref": "CertificateInfo"
                },
                "optional": false,
                "name": "certificates"
              },
              {
                "$ref": "ResultCallback",
                "optional": false,
                "name": "callback"
              }
            ]
          }
        ]
      },
      {
        "name": "onSignDigestRequested",
        "type": "function",
        "parameters": [
          {
            "$ref": "SignRequest",
            "optional": false,
            "name": "request"
          },
          {
            "optional": false,
            "name": "reportCallback",
            "type": "function",
            "parameters": [
              {
                "$ref": "ArrayBuffer",
                "optional": true,
                "name": "signature"
              }
            ]
          }
        ]
      }
    ],
    "namespace": "certificateProvider",
    "dependencies": [
      "permission:certificateProvider"
    ]
  },
  {
    "types": [
      {
        "id": "ScanOptions",
        "type": "object",
        "properties": {
          "mimeTypes": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "nullable": true
          },
          "maxImages": {
            "type": "integer",
            "nullable": true
          }
        }
      },
      {
        "id": "ScanResults",
        "type": "object",
        "properties": {
          "dataUrls": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "mimeType": {
            "type": "string"
          }
        }
      }
    ],
    "functions": [
      {
        "name": "scan",
        "type": "function",
        "parameters": [
          {
            "$ref": "ScanOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "$ref": "ScanResults",
                "optional": false,
                "name": "result"
              }
            ]
          }
        ],
        "static": true
      }
    ],
    "namespace": "documentScan",
    "dependencies": [
      "permission:documentScan"
    ]
  },
  {
    "functions": [
      {
        "name": "getDirectoryDeviceId",
        "type": "function",
        "parameters": [
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "type": "string",
                "optional": false,
                "name": "deviceId"
              }
            ]
          }
        ],
        "static": false
      }
    ],
    "namespace": "enterprise.deviceAttributes",
    "dependencies": [
      "permission:enterprise.deviceAttributes"
    ]
  },
  {
    "types": [
      {
        "id": "Token",
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "subtleCrypto": {
            "type": "object"
          }
        }
      }
    ],
    "functions": [
      {
        "name": "getTokens",
        "type": "function",
        "parameters": [
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "type": "array",
                "items": {
                  "$ref": "Token"
                },
                "optional": false,
                "name": "tokens"
              }
            ]
          }
        ],
        "static": true
      },
      {
        "name": "getCertificates",
        "type": "function",
        "parameters": [
          {
            "type": "string",
            "optional": false,
            "name": "tokenId"
          },
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "type": "array",
                "items": {
                  "$ref": "ArrayBuffer"
                },
                "optional": false,
                "name": "certificates"
              }
            ]
          }
        ],
        "static": true
      },
      {
        "name": "importCertificate",
        "type": "function",
        "parameters": [
          {
            "type": "string",
            "optional": false,
            "name": "tokenId"
          },
          {
            "$ref": "ArrayBuffer",
            "optional": false,
            "name": "certificate"
          },
          {
            "optional": true,
            "name": "callback",
            "type": "function",
            "parameters": []
          }
        ],
        "static": true
      },
      {
        "name": "removeCertificate",
        "type": "function",
        "parameters": [
          {
            "type": "string",
            "optional": false,
            "name": "tokenId"
          },
          {
            "$ref": "ArrayBuffer",
            "optional": false,
            "name": "certificate"
          },
          {
            "optional": true,
            "name": "callback",
            "type": "function",
            "parameters": []
          }
        ],
        "static": true
      },
      {
        "name": "challengeMachineKey",
        "type": "function",
        "parameters": [
          {
            "$ref": "ArrayBuffer",
            "optional": false,
            "name": "challenge"
          },
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "$ref": "ArrayBuffer",
                "optional": false,
                "name": "response"
              }
            ]
          }
        ],
        "static": true
      },
      {
        "name": "challengeUserKey",
        "type": "function",
        "parameters": [
          {
            "$ref": "ArrayBuffer",
            "optional": false,
            "name": "challenge"
          },
          {
            "type": "boolean",
            "optional": false,
            "name": "registerKey"
          },
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "$ref": "ArrayBuffer",
                "optional": false,
                "name": "response"
              }
            ]
          }
        ],
        "static": true
      }
    ],
    "namespace": "enterprise.platformKeys",
    "dependencies": [
      "permission:enterprise.platformKeys"
    ]
  },
  {
    "namespace": "fileBrowserHandler",
    "description": "Use the <code>chrome.fileBrowserHandler</code> API to extend the Chrome OS file browser. For example, you can use this API to enable users to upload files to your website.",
    "types": [
      {
        "id": "FileHandlerExecuteEventDetails",
        "type": "object",
        "description": "Event details payload for fileBrowserHandler.onExecute event.",
        "properties": {
          "entries": {
            "type": "array",
            "items": {
              "type": "any"
            },
            "description": "Array of Entry instances representing files that are targets of this action (selected in ChromeOS file browser)."
          },
          "tab_id": {
            "type": "integer",
            "optional": true,
            "description": "The ID of the tab that raised this event. Tab IDs are unique within a browser session."
          }
        }
      }
    ],
    "events": [
      {
        "name": "onExecute",
        "type": "function",
        "description": "Fired when file system action is executed from ChromeOS file browser.",
        "parameters": [
          {
            "name": "id",
            "type": "string",
            "description": "File browser action id as specified in the listener component's manifest."
          },
          {
            "name": "details",
            "$ref": "FileHandlerExecuteEventDetails",
            "description": "File handler execute event details."
          }
        ]
      }
    ],
    "functions": [
      {
        "name": "selectFile",
        "type": "function",
        "description": "Prompts user to select file path under which file should be saved. When the file is selected, file access permission required to use the file (read, write and create) are granted to the caller. The file will not actually get created during the function call, so function caller must ensure its existence before using it. The function has to be invoked with a user gesture.",
        "parameters": [
          {
            "name": "selectionParams",
            "type": "object",
            "description": "Parameters that will be used while selecting the file.",
            "properties": {
              "suggestedName": {
                "type": "string",
                "description": "Suggested name for the file."
              },
              "allowedFileExtensions": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "optional": true,
                "description": "List of file extensions that the selected file can have. The list is also used to specify what files to be shown in the select file dialog. Files with the listed extensions are only shown in the dialog. Extensions should not include the leading '.'. Example: ['jpg', 'png']"
              }
            }
          },
          {
            "name": "callback",
            "type": "function",
            "description": "Function called upon completion.",
            "parameters": [
              {
                "name": "result",
                "description": "Result of the method.",
                "type": "object",
                "properties": {
                  "success": {
                    "type": "boolean",
                    "description": "Whether the file has been selected."
                  },
                  "entry": {
                    "type": "object",
                    "constructor": "Entry",
                    "additionalProperties": {
                      "type": "any"
                    },
                    "optional": true,
                    "description": "Selected file entry. It will be null if a file hasn't been selected."
                  }
                }
              }
            ]
          }
        ]
      }
    ],
    "dependencies": [
      "permission:fileBrowserHandler"
    ]
  },
  {
    "types": [
      {
        "id": "ProviderError",
        "type": "string",
        "enum": [
          "OK",
          "FAILED",
          "IN_USE",
          "EXISTS",
          "NOT_FOUND",
          "ACCESS_DENIED",
          "TOO_MANY_OPENED",
          "NO_MEMORY",
          "NO_SPACE",
          "NOT_A_DIRECTORY",
          "INVALID_OPERATION",
          "SECURITY",
          "ABORT",
          "NOT_A_FILE",
          "NOT_EMPTY",
          "INVALID_URL",
          "IO"
        ]
      },
      {
        "id": "OpenFileMode",
        "type": "string",
        "enum": [
          "READ",
          "WRITE"
        ]
      },
      {
        "id": "ChangeType",
        "type": "string",
        "enum": [
          "CHANGED",
          "DELETED"
        ]
      },
      {
        "id": "CommonActionId",
        "type": "string",
        "enum": [
          "SAVE_FOR_OFFLINE",
          "OFFLINE_NOT_NECESSARY",
          "SHARE"
        ]
      },
      {
        "id": "EntryMetadata",
        "type": "object",
        "properties": {
          "isDirectory": {
            "type": "boolean",
            "nullable": true
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "size": {
            "type": "number",
            "nullable": true
          },
          "modificationTime": {
            "type": "object",
            "nullable": true
          },
          "mimeType": {
            "type": "string",
            "nullable": true
          },
          "thumbnail": {
            "type": "string",
            "nullable": true
          }
        }
      },
      {
        "id": "Watcher",
        "type": "object",
        "properties": {
          "entryPath": {
            "type": "string"
          },
          "recursive": {
            "type": "boolean"
          },
          "lastTag": {
            "type": "string",
            "nullable": true
          }
        }
      },
      {
        "id": "OpenedFile",
        "type": "object",
        "properties": {
          "openRequestId": {
            "type": "integer"
          },
          "filePath": {
            "type": "string"
          },
          "mode": {
            "$ref": "OpenFileMode"
          }
        }
      },
      {
        "id": "FileSystemInfo",
        "type": "object",
        "properties": {
          "fileSystemId": {
            "type": "string"
          },
          "displayName": {
            "type": "string"
          },
          "writable": {
            "type": "boolean"
          },
          "openedFilesLimit": {
            "type": "integer"
          },
          "openedFiles": {
            "type": "array",
            "items": {
              "$ref": "OpenedFile"
            }
          },
          "supportsNotifyTag": {
            "type": "boolean",
            "nullable": true
          },
          "watchers": {
            "type": "array",
            "items": {
              "$ref": "Watcher"
            }
          }
        }
      },
      {
        "id": "MountOptions",
        "type": "object",
        "properties": {
          "fileSystemId": {
            "type": "string"
          },
          "displayName": {
            "type": "string"
          },
          "writable": {
            "type": "boolean",
            "nullable": true
          },
          "openedFilesLimit": {
            "type": "integer",
            "nullable": true
          },
          "supportsNotifyTag": {
            "type": "boolean",
            "nullable": true
          }
        }
      },
      {
        "id": "UnmountOptions",
        "type": "object",
        "properties": {
          "fileSystemId": {
            "type": "string"
          }
        }
      },
      {
        "id": "UnmountRequestedOptions",
        "type": "object",
        "properties": {
          "fileSystemId": {
            "type": "string"
          },
          "requestId": {
            "type": "integer"
          }
        }
      },
      {
        "id": "GetMetadataRequestedOptions",
        "type": "object",
        "properties": {
          "fileSystemId": {
            "type": "string"
          },
          "requestId": {
            "type": "integer"
          },
          "entryPath": {
            "type": "string"
          },
          "isDirectory": {
            "type": "boolean"
          },
          "name": {
            "type": "boolean"
          },
          "size": {
            "type": "boolean"
          },
          "modificationTime": {
            "type": "boolean"
          },
          "mimeType": {
            "type": "boolean"
          },
          "thumbnail": {
            "type": "boolean"
          }
        }
      },
      {
        "id": "GetActionsRequestedOptions",
        "type": "object",
        "properties": {
          "fileSystemId": {
            "type": "string"
          },
          "requestId": {
            "type": "integer"
          },
          "entryPaths": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        }
      },
      {
        "id": "ReadDirectoryRequestedOptions",
        "type": "object",
        "properties": {
          "fileSystemId": {
            "type": "string"
          },
          "requestId": {
            "type": "integer"
          },
          "directoryPath": {
            "type": "string"
          },
          "isDirectory": {
            "type": "boolean"
          },
          "name": {
            "type": "boolean"
          },
          "size": {
            "type": "boolean"
          },
          "modificationTime": {
            "type": "boolean"
          },
          "mimeType": {
            "type": "boolean"
          },
          "thumbnail": {
            "type": "boolean"
          }
        }
      },
      {
        "id": "OpenFileRequestedOptions",
        "type": "object",
        "properties": {
          "fileSystemId": {
            "type": "string"
          },
          "requestId": {
            "type": "integer"
          },
          "filePath": {
            "type": "string"
          },
          "mode": {
            "$ref": "OpenFileMode"
          }
        }
      },
      {
        "id": "CloseFileRequestedOptions",
        "type": "object",
        "properties": {
          "fileSystemId": {
            "type": "string"
          },
          "requestId": {
            "type": "integer"
          },
          "openRequestId": {
            "type": "integer"
          }
        }
      },
      {
        "id": "ReadFileRequestedOptions",
        "type": "object",
        "properties": {
          "fileSystemId": {
            "type": "string"
          },
          "requestId": {
            "type": "integer"
          },
          "openRequestId": {
            "type": "integer"
          },
          "offset": {
            "type": "number"
          },
          "length": {
            "type": "number"
          }
        }
      },
      {
        "id": "CreateDirectoryRequestedOptions",
        "type": "object",
        "properties": {
          "fileSystemId": {
            "type": "string"
          },
          "requestId": {
            "type": "integer"
          },
          "directoryPath": {
            "type": "string"
          },
          "recursive": {
            "type": "boolean"
          }
        }
      },
      {
        "id": "DeleteEntryRequestedOptions",
        "type": "object",
        "properties": {
          "fileSystemId": {
            "type": "string"
          },
          "requestId": {
            "type": "integer"
          },
          "entryPath": {
            "type": "string"
          },
          "recursive": {
            "type": "boolean"
          }
        }
      },
      {
        "id": "CreateFileRequestedOptions",
        "type": "object",
        "properties": {
          "fileSystemId": {
            "type": "string"
          },
          "requestId": {
            "type": "integer"
          },
          "filePath": {
            "type": "string"
          }
        }
      },
      {
        "id": "CopyEntryRequestedOptions",
        "type": "object",
        "properties": {
          "fileSystemId": {
            "type": "string"
          },
          "requestId": {
            "type": "integer"
          },
          "sourcePath": {
            "type": "string"
          },
          "targetPath": {
            "type": "string"
          }
        }
      },
      {
        "id": "MoveEntryRequestedOptions",
        "type": "object",
        "properties": {
          "fileSystemId": {
            "type": "string"
          },
          "requestId": {
            "type": "integer"
          },
          "sourcePath": {
            "type": "string"
          },
          "targetPath": {
            "type": "string"
          }
        }
      },
      {
        "id": "TruncateRequestedOptions",
        "type": "object",
        "properties": {
          "fileSystemId": {
            "type": "string"
          },
          "requestId": {
            "type": "integer"
          },
          "filePath": {
            "type": "string"
          },
          "length": {
            "type": "number"
          }
        }
      },
      {
        "id": "WriteFileRequestedOptions",
        "type": "object",
        "properties": {
          "fileSystemId": {
            "type": "string"
          },
          "requestId": {
            "type": "integer"
          },
          "openRequestId": {
            "type": "integer"
          },
          "offset": {
            "type": "number"
          },
          "data": {
            "$ref": "ArrayBuffer"
          }
        }
      },
      {
        "id": "AbortRequestedOptions",
        "type": "object",
        "properties": {
          "fileSystemId": {
            "type": "string"
          },
          "requestId": {
            "type": "integer"
          },
          "operationRequestId": {
            "type": "integer"
          }
        }
      },
      {
        "id": "AddWatcherRequestedOptions",
        "type": "object",
        "properties": {
          "fileSystemId": {
            "type": "string"
          },
          "requestId": {
            "type": "integer"
          },
          "entryPath": {
            "type": "string"
          },
          "recursive": {
            "type": "boolean"
          }
        }
      },
      {
        "id": "RemoveWatcherRequestedOptions",
        "type": "object",
        "properties": {
          "fileSystemId": {
            "type": "string"
          },
          "requestId": {
            "type": "integer"
          },
          "entryPath": {
            "type": "string"
          },
          "recursive": {
            "type": "boolean"
          }
        }
      },
      {
        "id": "Action",
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "title": {
            "type": "string",
            "nullable": true
          }
        }
      },
      {
        "id": "ExecuteActionRequestedOptions",
        "type": "object",
        "properties": {
          "fileSystemId": {
            "type": "string"
          },
          "requestId": {
            "type": "integer"
          },
          "entryPaths": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "actionId": {
            "type": "string"
          }
        }
      },
      {
        "id": "Change",
        "type": "object",
        "properties": {
          "entryPath": {
            "type": "string"
          },
          "changeType": {
            "$ref": "ChangeType"
          }
        }
      },
      {
        "id": "NotifyOptions",
        "type": "object",
        "properties": {
          "fileSystemId": {
            "type": "string"
          },
          "observedPath": {
            "type": "string"
          },
          "recursive": {
            "type": "boolean"
          },
          "changeType": {
            "$ref": "ChangeType"
          },
          "changes": {
            "type": "array",
            "items": {
              "$ref": "Change"
            },
            "nullable": true
          },
          "tag": {
            "type": "string",
            "nullable": true
          }
        }
      },
      {
        "id": "ConfigureRequestedOptions",
        "type": "object",
        "properties": {
          "fileSystemId": {
            "type": "string"
          },
          "requestId": {
            "type": "integer"
          }
        }
      }
    ],
    "functions": [
      {
        "name": "mount",
        "type": "function",
        "parameters": [
          {
            "$ref": "MountOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": true,
            "name": "callback",
            "type": "function",
            "parameters": []
          }
        ],
        "static": true
      },
      {
        "name": "unmount",
        "type": "function",
        "parameters": [
          {
            "$ref": "UnmountOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": true,
            "name": "callback",
            "type": "function",
            "parameters": []
          }
        ],
        "static": true
      },
      {
        "name": "getAll",
        "type": "function",
        "parameters": [
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "type": "array",
                "items": {
                  "$ref": "FileSystemInfo"
                },
                "optional": false,
                "name": "fileSystems"
              }
            ]
          }
        ],
        "static": true
      },
      {
        "name": "get",
        "type": "function",
        "parameters": [
          {
            "type": "string",
            "optional": false,
            "name": "fileSystemId"
          },
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "$ref": "FileSystemInfo",
                "optional": false,
                "name": "fileSystem"
              }
            ]
          }
        ],
        "static": true
      },
      {
        "name": "notify",
        "type": "function",
        "parameters": [
          {
            "$ref": "NotifyOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": true,
            "name": "callback",
            "type": "function",
            "parameters": []
          }
        ],
        "static": true
      }
    ],
    "events": [
      {
        "name": "onUnmountRequested",
        "type": "function",
        "parameters": [
          {
            "$ref": "UnmountRequestedOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": false,
            "name": "successCallback",
            "type": "function",
            "parameters": []
          },
          {
            "optional": false,
            "name": "errorCallback",
            "type": "function",
            "parameters": [
              {
                "$ref": "ProviderError",
                "optional": false,
                "name": "error"
              }
            ]
          }
        ]
      },
      {
        "name": "onGetMetadataRequested",
        "type": "function",
        "parameters": [
          {
            "$ref": "GetMetadataRequestedOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": false,
            "name": "successCallback",
            "type": "function",
            "parameters": [
              {
                "$ref": "EntryMetadata",
                "optional": false,
                "name": "metadata"
              }
            ]
          },
          {
            "optional": false,
            "name": "errorCallback",
            "type": "function",
            "parameters": [
              {
                "$ref": "ProviderError",
                "optional": false,
                "name": "error"
              }
            ]
          }
        ]
      },
      {
        "name": "onGetActionsRequested",
        "type": "function",
        "parameters": [
          {
            "$ref": "GetActionsRequestedOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": false,
            "name": "successCallback",
            "type": "function",
            "parameters": [
              {
                "type": "array",
                "items": {
                  "$ref": "Action"
                },
                "optional": false,
                "name": "actions"
              }
            ]
          },
          {
            "optional": false,
            "name": "errorCallback",
            "type": "function",
            "parameters": [
              {
                "$ref": "ProviderError",
                "optional": false,
                "name": "error"
              }
            ]
          }
        ]
      },
      {
        "name": "onReadDirectoryRequested",
        "type": "function",
        "parameters": [
          {
            "$ref": "ReadDirectoryRequestedOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": false,
            "name": "successCallback",
            "type": "function",
            "parameters": [
              {
                "type": "array",
                "items": {
                  "$ref": "EntryMetadata"
                },
                "optional": false,
                "name": "entries"
              },
              {
                "type": "boolean",
                "optional": false,
                "name": "hasMore"
              }
            ]
          },
          {
            "optional": false,
            "name": "errorCallback",
            "type": "function",
            "parameters": [
              {
                "$ref": "ProviderError",
                "optional": false,
                "name": "error"
              }
            ]
          }
        ]
      },
      {
        "name": "onOpenFileRequested",
        "type": "function",
        "parameters": [
          {
            "$ref": "OpenFileRequestedOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": false,
            "name": "successCallback",
            "type": "function",
            "parameters": []
          },
          {
            "optional": false,
            "name": "errorCallback",
            "type": "function",
            "parameters": [
              {
                "$ref": "ProviderError",
                "optional": false,
                "name": "error"
              }
            ]
          }
        ]
      },
      {
        "name": "onCloseFileRequested",
        "type": "function",
        "parameters": [
          {
            "$ref": "CloseFileRequestedOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": false,
            "name": "successCallback",
            "type": "function",
            "parameters": []
          },
          {
            "optional": false,
            "name": "errorCallback",
            "type": "function",
            "parameters": [
              {
                "$ref": "ProviderError",
                "optional": false,
                "name": "error"
              }
            ]
          }
        ]
      },
      {
        "name": "onReadFileRequested",
        "type": "function",
        "parameters": [
          {
            "$ref": "ReadFileRequestedOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": false,
            "name": "successCallback",
            "type": "function",
            "parameters": [
              {
                "$ref": "ArrayBuffer",
                "optional": false,
                "name": "data"
              },
              {
                "type": "boolean",
                "optional": false,
                "name": "hasMore"
              }
            ]
          },
          {
            "optional": false,
            "name": "errorCallback",
            "type": "function",
            "parameters": [
              {
                "$ref": "ProviderError",
                "optional": false,
                "name": "error"
              }
            ]
          }
        ]
      },
      {
        "name": "onCreateDirectoryRequested",
        "type": "function",
        "parameters": [
          {
            "$ref": "CreateDirectoryRequestedOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": false,
            "name": "successCallback",
            "type": "function",
            "parameters": []
          },
          {
            "optional": false,
            "name": "errorCallback",
            "type": "function",
            "parameters": [
              {
                "$ref": "ProviderError",
                "optional": false,
                "name": "error"
              }
            ]
          }
        ]
      },
      {
        "name": "onDeleteEntryRequested",
        "type": "function",
        "parameters": [
          {
            "$ref": "DeleteEntryRequestedOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": false,
            "name": "successCallback",
            "type": "function",
            "parameters": []
          },
          {
            "optional": false,
            "name": "errorCallback",
            "type": "function",
            "parameters": [
              {
                "$ref": "ProviderError",
                "optional": false,
                "name": "error"
              }
            ]
          }
        ]
      },
      {
        "name": "onCreateFileRequested",
        "type": "function",
        "parameters": [
          {
            "$ref": "CreateFileRequestedOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": false,
            "name": "successCallback",
            "type": "function",
            "parameters": []
          },
          {
            "optional": false,
            "name": "errorCallback",
            "type": "function",
            "parameters": [
              {
                "$ref": "ProviderError",
                "optional": false,
                "name": "error"
              }
            ]
          }
        ]
      },
      {
        "name": "onCopyEntryRequested",
        "type": "function",
        "parameters": [
          {
            "$ref": "CopyEntryRequestedOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": false,
            "name": "successCallback",
            "type": "function",
            "parameters": []
          },
          {
            "optional": false,
            "name": "errorCallback",
            "type": "function",
            "parameters": [
              {
                "$ref": "ProviderError",
                "optional": false,
                "name": "error"
              }
            ]
          }
        ]
      },
      {
        "name": "onMoveEntryRequested",
        "type": "function",
        "parameters": [
          {
            "$ref": "MoveEntryRequestedOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": false,
            "name": "successCallback",
            "type": "function",
            "parameters": []
          },
          {
            "optional": false,
            "name": "errorCallback",
            "type": "function",
            "parameters": [
              {
                "$ref": "ProviderError",
                "optional": false,
                "name": "error"
              }
            ]
          }
        ]
      },
      {
        "name": "onTruncateRequested",
        "type": "function",
        "parameters": [
          {
            "$ref": "TruncateRequestedOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": false,
            "name": "successCallback",
            "type": "function",
            "parameters": []
          },
          {
            "optional": false,
            "name": "errorCallback",
            "type": "function",
            "parameters": [
              {
                "$ref": "ProviderError",
                "optional": false,
                "name": "error"
              }
            ]
          }
        ]
      },
      {
        "name": "onWriteFileRequested",
        "type": "function",
        "parameters": [
          {
            "$ref": "WriteFileRequestedOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": false,
            "name": "successCallback",
            "type": "function",
            "parameters": []
          },
          {
            "optional": false,
            "name": "errorCallback",
            "type": "function",
            "parameters": [
              {
                "$ref": "ProviderError",
                "optional": false,
                "name": "error"
              }
            ]
          }
        ]
      },
      {
        "name": "onAbortRequested",
        "type": "function",
        "parameters": [
          {
            "$ref": "AbortRequestedOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": false,
            "name": "successCallback",
            "type": "function",
            "parameters": []
          },
          {
            "optional": false,
            "name": "errorCallback",
            "type": "function",
            "parameters": [
              {
                "$ref": "ProviderError",
                "optional": false,
                "name": "error"
              }
            ]
          }
        ]
      },
      {
        "name": "onConfigureRequested",
        "type": "function",
        "parameters": [
          {
            "$ref": "ConfigureRequestedOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": false,
            "name": "successCallback",
            "type": "function",
            "parameters": []
          },
          {
            "optional": false,
            "name": "errorCallback",
            "type": "function",
            "parameters": [
              {
                "$ref": "ProviderError",
                "optional": false,
                "name": "error"
              }
            ]
          }
        ]
      },
      {
        "name": "onMountRequested",
        "type": "function",
        "parameters": [
          {
            "optional": false,
            "name": "successCallback",
            "type": "function",
            "parameters": []
          },
          {
            "optional": false,
            "name": "errorCallback",
            "type": "function",
            "parameters": [
              {
                "$ref": "ProviderError",
                "optional": false,
                "name": "error"
              }
            ]
          }
        ]
      },
      {
        "name": "onAddWatcherRequested",
        "type": "function",
        "parameters": [
          {
            "$ref": "AddWatcherRequestedOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": false,
            "name": "successCallback",
            "type": "function",
            "parameters": []
          },
          {
            "optional": false,
            "name": "errorCallback",
            "type": "function",
            "parameters": [
              {
                "$ref": "ProviderError",
                "optional": false,
                "name": "error"
              }
            ]
          }
        ]
      },
      {
        "name": "onRemoveWatcherRequested",
        "type": "function",
        "parameters": [
          {
            "$ref": "RemoveWatcherRequestedOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": false,
            "name": "successCallback",
            "type": "function",
            "parameters": []
          },
          {
            "optional": false,
            "name": "errorCallback",
            "type": "function",
            "parameters": [
              {
                "$ref": "ProviderError",
                "optional": false,
                "name": "error"
              }
            ]
          }
        ]
      },
      {
        "name": "onExecuteActionRequested",
        "type": "function",
        "parameters": [
          {
            "$ref": "ExecuteActionRequestedOptions",
            "optional": false,
            "name": "options"
          },
          {
            "optional": false,
            "name": "successCallback",
            "type": "function",
            "parameters": []
          },
          {
            "optional": false,
            "name": "errorCallback",
            "type": "function",
            "parameters": [
              {
                "$ref": "ProviderError",
                "optional": false,
                "name": "error"
              }
            ]
          }
        ]
      }
    ],
    "namespace": "fileSystemProvider",
    "dependencies": [
      "permission:fileSystemProvider"
    ]
  },
  {
    "namespace": "input.ime",
    "description": "Use the <code>chrome.input.ime</code> API to implement a custom IME for Chrome OS. This allows your extension to handle keystrokes, set the composition, and manage the candidate window.",
    "types": [
      {
        "id": "KeyboardEventType",
        "type": "string",
        "enum": [
          "keyup",
          "keydown"
        ]
      },
      {
        "id": "KeyboardEvent",
        "type": "object",
        "description": "See http://www.w3.org/TR/DOM-Level-3-Events/#events-KeyboardEvent",
        "properties": {
          "type": {
            "$ref": "KeyboardEventType",
            "description": "One of keyup or keydown."
          },
          "requestId": {
            "type": "string",
            "description": "The ID of the request."
          },
          "extensionId": {
            "type": "string",
            "optional": true,
            "description": "The extension ID of the sender of this keyevent."
          },
          "key": {
            "type": "string",
            "description": "Value of the key being pressed"
          },
          "code": {
            "type": "string",
            "description": "Value of the physical key being pressed. The value is not affected by current keyboard layout or modifier state."
          },
          "keyCode": {
            "type": "integer",
            "optional": true,
            "description": "The deprecated HTML keyCode, which is system- and implementation-dependent numerical code signifying the unmodified identifier associated with the key pressed."
          },
          "altKey": {
            "type": "boolean",
            "optional": true,
            "description": "Whether or not the ALT key is pressed."
          },
          "ctrlKey": {
            "type": "boolean",
            "optional": true,
            "description": "Whether or not the CTRL key is pressed."
          },
          "shiftKey": {
            "type": "boolean",
            "optional": true,
            "description": "Whether or not the SHIFT key is pressed."
          },
          "capsLock": {
            "type": "boolean",
            "optional": true,
            "description": "Whether or not the CAPS_LOCK is enabled."
          }
        }
      },
      {
        "id": "InputContextType",
        "type": "string",
        "description": "Type of value this text field edits, (Text, Number, URL, etc)",
        "enum": [
          "text",
          "search",
          "tel",
          "url",
          "email",
          "number",
          "password"
        ]
      },
      {
        "id": "InputContext",
        "type": "object",
        "description": "Describes an input Context",
        "properties": {
          "contextID": {
            "type": "integer",
            "description": "This is used to specify targets of text field operations.  This ID becomes invalid as soon as onBlur is called."
          },
          "type": {
            "$ref": "InputContextType",
            "description": "Type of value this text field edits, (Text, Number, URL, etc)"
          },
          "autoCorrect": {
            "type": "boolean",
            "description": "Whether the text field wants auto-correct."
          },
          "autoComplete": {
            "type": "boolean",
            "description": "Whether the text field wants auto-complete."
          },
          "spellCheck": {
            "type": "boolean",
            "description": "Whether the text field wants spell-check."
          }
        }
      },
      {
        "id": "MenuItemStyle",
        "type": "string",
        "description": "The type of menu item. Radio buttons between separators are considered grouped.",
        "enum": [
          "check",
          "radio",
          "separator"
        ]
      },
      {
        "id": "MenuItem",
        "type": "object",
        "description": "A menu item used by an input method to interact with the user from the language menu.",
        "properties": {
          "id": {
            "type": "string",
            "description": "String that will be passed to callbacks referencing this MenuItem."
          },
          "label": {
            "type": "string",
            "optional": true,
            "description": "Text displayed in the menu for this item."
          },
          "style": {
            "$ref": "MenuItemStyle",
            "optional": true,
            "description": "The type of menu item."
          },
          "visible": {
            "type": "boolean",
            "optional": true,
            "description": "Indicates this item is visible."
          },
          "checked": {
            "type": "boolean",
            "optional": true,
            "description": "Indicates this item should be drawn with a check."
          },
          "enabled": {
            "type": "boolean",
            "optional": true,
            "description": "Indicates this item is enabled."
          }
        }
      },
      {
        "id": "UnderlineStyle",
        "type": "string",
        "description": "The type of the underline to modify this segment.",
        "enum": [
          "underline",
          "doubleUnderline",
          "noUnderline"
        ]
      },
      {
        "id": "WindowPosition",
        "type": "string",
        "description": "Where to display the candidate window. If set to 'cursor', the window follows the cursor. If set to 'composition', the window is locked to the beginning of the composition.",
        "enum": [
          "cursor",
          "composition"
        ]
      },
      {
        "id": "ScreenType",
        "type": "string",
        "enum": [
          "normal",
          "login",
          "lock",
          "secondary-login"
        ],
        "description": "The screen type under which the IME is activated."
      },
      {
        "id": "CallbackStyle",
        "type": "string",
        "enum": [
          "async"
        ]
      },
      {
        "id": "MouseButton",
        "type": "string",
        "description": "Which mouse buttons was clicked.",
        "enum": [
          "left",
          "middle",
          "right"
        ]
      },
      {
        "id": "WindowType",
        "type": "string",
        "description": "The IME window types.",
        "platforms": [
          "win",
          "linux"
        ],
        "enum": [
          "normal",
          "followCursor"
        ]
      },
      {
        "id": "Bounds",
        "type": "object",
        "description": "Describes the screen coordinates of a rect.",
        "platforms": [
          "win",
          "linux"
        ],
        "properties": {
          "left": {
            "type": "integer",
            "description": "The left of the bounds."
          },
          "top": {
            "type": "integer",
            "description": "The top of the bounds."
          },
          "width": {
            "type": "integer",
            "description": "The width of the bounds."
          },
          "height": {
            "type": "integer",
            "description": "The height of the bounds ."
          }
        }
      },
      {
        "id": "CreateWindowOptions",
        "type": "object",
        "description": "The options to create an IME window",
        "platforms": [
          "win",
          "linux"
        ],
        "properties": {
          "windowType": {
            "$ref": "WindowType"
          },
          "url": {
            "type": "string",
            "optional": true
          },
          "bounds": {
            "$ref": "Bounds",
            "optional": true
          }
        }
      }
    ],
    "functions": [
      {
        "name": "setComposition",
        "type": "function",
        "description": "Set the current composition. If this extension does not own the active IME, this fails.",
        "platforms": [
          "chromeos",
          "win",
          "linux"
        ],
        "parameters": [
          {
            "name": "parameters",
            "type": "object",
            "properties": {
              "contextID": {
                "description": "ID of the context where the composition text will be set",
                "type": "integer"
              },
              "text": {
                "description": "Text to set",
                "type": "string"
              },
              "selectionStart": {
                "description": "Position in the text that the selection starts at.",
                "optional": true,
                "type": "integer"
              },
              "selectionEnd": {
                "description": "Position in the text that the selection ends at.",
                "optional": true,
                "type": "integer"
              },
              "cursor": {
                "description": "Position in the text of the cursor.",
                "type": "integer"
              },
              "segments": {
                "description": "List of segments and their associated types.",
                "type": "array",
                "optional": true,
                "items": {
                  "type": "object",
                  "properties": {
                    "start": {
                      "description": "Index of the character to start this segment at",
                      "type": "integer"
                    },
                    "end": {
                      "description": "Index of the character to end this segment after.",
                      "type": "integer"
                    },
                    "style": {
                      "$ref": "UnderlineStyle",
                      "description": "The type of the underline to modify this segment."
                    }
                  }
                }
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "description": "Called when the operation completes with a boolean indicating if the text was accepted or not. On failure, chrome.runtime.lastError is set.",
            "parameters": [
              {
                "name": "success",
                "type": "boolean"
              }
            ]
          }
        ]
      },
      {
        "name": "clearComposition",
        "type": "function",
        "description": "Clear the current composition. If this extension does not own the active IME, this fails.",
        "platforms": [
          "chromeos"
        ],
        "parameters": [
          {
            "name": "parameters",
            "type": "object",
            "properties": {
              "contextID": {
                "description": "ID of the context where the composition will be cleared",
                "type": "integer"
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "description": "Called when the operation completes with a boolean indicating if the text was accepted or not. On failure, chrome.runtime.lastError is set.",
            "parameters": [
              {
                "name": "success",
                "type": "boolean"
              }
            ]
          }
        ]
      },
      {
        "name": "commitText",
        "type": "function",
        "description": "Commits the provided text to the current input.",
        "platforms": [
          "chromeos",
          "win",
          "linux"
        ],
        "parameters": [
          {
            "name": "parameters",
            "type": "object",
            "properties": {
              "contextID": {
                "description": "ID of the context where the text will be committed",
                "type": "integer"
              },
              "text": {
                "description": "The text to commit",
                "type": "string"
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "description": "Called when the operation completes with a boolean indicating if the text was accepted or not. On failure, chrome.runtime.lastError is set.",
            "parameters": [
              {
                "name": "success",
                "type": "boolean"
              }
            ]
          }
        ]
      },
      {
        "name": "sendKeyEvents",
        "type": "function",
        "description": "Sends the key events.  This function is expected to be used by virtual keyboards.  When key(s) on a virtual keyboard is pressed by a user, this function is used to propagate that event to the system.",
        "platforms": [
          "chromeos",
          "win",
          "linux"
        ],
        "parameters": [
          {
            "name": "parameters",
            "type": "object",
            "properties": {
              "contextID": {
                "description": "ID of the context where the key events will be sent, or zero to send key events to non-input field.",
                "type": "integer"
              },
              "keyData": {
                "type": "array",
                "description": "Data on the key event.",
                "items": {
                  "$ref": "KeyboardEvent"
                }
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "description": "Called when the operation completes.",
            "parameters": []
          }
        ]
      },
      {
        "name": "hideInputView",
        "type": "function",
        "description": "Hides the input view window, which is popped up automatically by system. If the input view window is already hidden, this function will do nothing.",
        "platforms": [
          "chromeos"
        ],
        "parameters": []
      },
      {
        "name": "setCandidateWindowProperties",
        "type": "function",
        "description": "Sets the properties of the candidate window. This fails if the extension doesn't own the active IME",
        "platforms": [
          "chromeos"
        ],
        "parameters": [
          {
            "name": "parameters",
            "type": "object",
            "properties": {
              "engineID": {
                "description": "ID of the engine to set properties on.",
                "type": "string"
              },
              "properties": {
                "type": "object",
                "properties": {
                  "visible": {
                    "type": "boolean",
                    "optional": true,
                    "description": "True to show the Candidate window, false to hide it."
                  },
                  "cursorVisible": {
                    "type": "boolean",
                    "optional": true,
                    "description": "True to show the cursor, false to hide it."
                  },
                  "vertical": {
                    "type": "boolean",
                    "optional": true,
                    "description": "True if the candidate window should be rendered vertical, false to make it horizontal."
                  },
                  "pageSize": {
                    "type": "integer",
                    "optional": true,
                    "description": "The number of candidates to display per page."
                  },
                  "auxiliaryText": {
                    "type": "string",
                    "optional": true,
                    "description": "Text that is shown at the bottom of the candidate window."
                  },
                  "auxiliaryTextVisible": {
                    "type": "boolean",
                    "optional": true,
                    "description": "True to display the auxiliary text, false to hide it."
                  },
                  "windowPosition": {
                    "$ref": "WindowPosition",
                    "description": "Where to display the candidate window.",
                    "optional": true
                  }
                }
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "description": "Called when the operation completes.",
            "parameters": [
              {
                "name": "success",
                "type": "boolean"
              }
            ]
          }
        ]
      },
      {
        "name": "setCandidates",
        "type": "function",
        "description": "Sets the current candidate list. This fails if this extension doesn't own the active IME",
        "platforms": [
          "chromeos"
        ],
        "parameters": [
          {
            "name": "parameters",
            "type": "object",
            "properties": {
              "contextID": {
                "description": "ID of the context that owns the candidate window.",
                "type": "integer"
              },
              "candidates": {
                "description": "List of candidates to show in the candidate window",
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "candidate": {
                      "type": "string",
                      "description": "The candidate"
                    },
                    "id": {
                      "type": "integer",
                      "description": "The candidate's id"
                    },
                    "parentId": {
                      "type": "integer",
                      "optional": true,
                      "description": "The id to add these candidates under"
                    },
                    "label": {
                      "type": "string",
                      "optional": true,
                      "description": "Short string displayed to next to the candidate, often the shortcut key or index"
                    },
                    "annotation": {
                      "type": "string",
                      "optional": true,
                      "description": "Additional text describing the candidate"
                    },
                    "usage": {
                      "type": "object",
                      "optional": true,
                      "description": "The usage or detail description of word.",
                      "properties": {
                        "title": {
                          "type": "string",
                          "description": "The title string of details description."
                        },
                        "body": {
                          "type": "string",
                          "description": "The body string of detail description."
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "description": "Called when the operation completes.",
            "parameters": [
              {
                "name": "success",
                "type": "boolean"
              }
            ]
          }
        ]
      },
      {
        "name": "setCursorPosition",
        "type": "function",
        "description": "Set the position of the cursor in the candidate window. This is a no-op if this extension does not own the active IME.",
        "platforms": [
          "chromeos"
        ],
        "parameters": [
          {
            "name": "parameters",
            "type": "object",
            "properties": {
              "contextID": {
                "description": "ID of the context that owns the candidate window.",
                "type": "integer"
              },
              "candidateID": {
                "description": "ID of the candidate to select.",
                "type": "integer"
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "description": "Called when the operation completes",
            "parameters": [
              {
                "name": "success",
                "type": "boolean"
              }
            ]
          }
        ]
      },
      {
        "name": "setMenuItems",
        "type": "function",
        "description": "Adds the provided menu items to the language menu when this IME is active.",
        "platforms": [
          "chromeos"
        ],
        "parameters": [
          {
            "name": "parameters",
            "type": "object",
            "properties": {
              "engineID": {
                "description": "ID of the engine to use",
                "type": "string"
              },
              "items": {
                "description": "MenuItems to add. They will be added in the order they exist in the array.",
                "type": "array",
                "items": {
                  "$ref": "MenuItem"
                }
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "description": "",
            "parameters": []
          }
        ]
      },
      {
        "name": "updateMenuItems",
        "type": "function",
        "description": "Updates the state of the MenuItems specified",
        "platforms": [
          "chromeos"
        ],
        "parameters": [
          {
            "name": "parameters",
            "type": "object",
            "properties": {
              "engineID": {
                "description": "ID of the engine to use",
                "type": "string"
              },
              "items": {
                "description": "Array of MenuItems to update",
                "type": "array",
                "items": {
                  "$ref": "MenuItem"
                }
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "description": "Called when the operation completes",
            "parameters": []
          }
        ]
      },
      {
        "name": "deleteSurroundingText",
        "type": "function",
        "description": "Deletes the text around the caret.",
        "platforms": [
          "chromeos"
        ],
        "parameters": [
          {
            "name": "parameters",
            "type": "object",
            "properties": {
              "engineID": {
                "type": "string",
                "description": "ID of the engine receiving the event."
              },
              "contextID": {
                "type": "integer",
                "description": "ID of the context where the surrounding text will be deleted."
              },
              "offset": {
                "type": "integer",
                "description": "The offset from the caret position where deletion will start. This value can be negative."
              },
              "length": {
                "type": "integer",
                "description": "The number of characters to be deleted",
                "minimum": 0
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "description": "Called when the operation completes.",
            "parameters": []
          }
        ]
      },
      {
        "name": "keyEventHandled",
        "type": "function",
        "description": "Indicates that the key event received by onKeyEvent is handled.  This should only be called if the onKeyEvent listener is asynchronous.",
        "platforms": [
          "chromeos",
          "win",
          "linux"
        ],
        "parameters": [
          {
            "type": "string",
            "name": "requestId",
            "description": "Request id of the event that was handled.  This should come from keyEvent.requestId"
          },
          {
            "type": "boolean",
            "name": "response",
            "description": "True if the keystroke was handled, false if not"
          }
        ]
      },
      {
        "name": "createWindow",
        "type": "function",
        "description": "Creates IME window.",
        "platforms": [
          "win",
          "linux"
        ],
        "parameters": [
          {
            "$ref": "CreateWindowOptions",
            "name": "options",
            "description": "The options of the newly created IME window."
          },
          {
            "type": "function",
            "name": "callback",
            "description": "Called when the operation completes.",
            "parameters": [
              {
                "name": "windowObject",
                "type": "object",
                "isInstanceOf": "Window",
                "description": "The JavaScript 'window' object of the newly created IME window. It contains the additional 'id' property for the parameters of the other functions like showWindow/hideWindow."
              }
            ]
          }
        ]
      },
      {
        "name": "showWindow",
        "type": "function",
        "description": "Shows the IME window. This makes the hidden window visible.",
        "platforms": [
          "win",
          "linux"
        ],
        "parameters": [
          {
            "type": "integer",
            "name": "windowId",
            "description": "The ID of the IME window."
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "description": "Called when the operation completes.",
            "parameters": []
          }
        ]
      },
      {
        "name": "hideWindow",
        "type": "function",
        "description": "Hides the IME window. This doesn't close the window. Instead, it makes the window invisible. The extension can cache the window and show/hide it for better performance.",
        "platforms": [
          "win",
          "linux"
        ],
        "parameters": [
          {
            "type": "integer",
            "name": "windowId",
            "description": "The ID of the IME window."
          },
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "description": "Called when the operation completes.",
            "parameters": []
          }
        ]
      },
      {
        "name": "activate",
        "type": "function",
        "description": "Activates the IME extension so that it can receive events.",
        "platforms": [
          "win",
          "linux"
        ],
        "parameters": [
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "description": "Called when the operation completes.",
            "parameters": []
          }
        ]
      },
      {
        "name": "deactivate",
        "type": "function",
        "description": "Deactivates the IME extension so that it cannot receive events.",
        "platforms": [
          "win",
          "linux"
        ],
        "parameters": [
          {
            "type": "function",
            "name": "callback",
            "optional": true,
            "description": "Called when the operation completes.",
            "parameters": []
          }
        ]
      }
    ],
    "events": [
      {
        "name": "onActivate",
        "type": "function",
        "description": "This event is sent when an IME is activated. It signals that the IME will be receiving onKeyPress events.",
        "platforms": [
          "chromeos",
          "win",
          "linux"
        ],
        "parameters": [
          {
            "type": "string",
            "name": "engineID",
            "description": "ID of the engine receiving the event"
          },
          {
            "name": "screen",
            "$ref": "ScreenType",
            "description": "The screen type under which the IME is activated."
          }
        ]
      },
      {
        "name": "onDeactivated",
        "type": "function",
        "description": "This event is sent when an IME is deactivated. It signals that the IME will no longer be receiving onKeyPress events.",
        "platforms": [
          "chromeos",
          "win",
          "linux"
        ],
        "parameters": [
          {
            "type": "string",
            "name": "engineID",
            "description": "ID of the engine receiving the event"
          }
        ]
      },
      {
        "name": "onFocus",
        "type": "function",
        "description": "This event is sent when focus enters a text box. It is sent to all extensions that are listening to this event, and enabled by the user.",
        "platforms": [
          "chromeos",
          "win",
          "linux"
        ],
        "parameters": [
          {
            "$ref": "InputContext",
            "name": "context",
            "description": "Describes the text field that has acquired focus."
          }
        ]
      },
      {
        "name": "onBlur",
        "type": "function",
        "description": "This event is sent when focus leaves a text box. It is sent to all extensions that are listening to this event, and enabled by the user.",
        "platforms": [
          "chromeos",
          "win",
          "linux"
        ],
        "parameters": [
          {
            "type": "integer",
            "name": "contextID",
            "description": "The ID of the text field that has lost focus. The ID is invalid after this call"
          }
        ]
      },
      {
        "name": "onInputContextUpdate",
        "type": "function",
        "description": "This event is sent when the properties of the current InputContext change, such as the the type. It is sent to all extensions that are listening to this event, and enabled by the user.",
        "platforms": [
          "chromeos"
        ],
        "parameters": [
          {
            "$ref": "InputContext",
            "name": "context",
            "description": "An InputContext object describing the text field that has changed."
          }
        ]
      },
      {
        "name": "onKeyEvent",
        "type": "function",
        "description": "Fired when a key event is sent from the operating system. The event will be sent to the extension if this extension owns the active IME.",
        "platforms": [
          "chromeos",
          "win",
          "linux"
        ],
        "options": {
          "supportsFilters": false,
          "supportsListeners": true,
          "supportsRules": false,
          "maxListeners": 1
        },
        "parameters": [
          {
            "type": "string",
            "name": "engineID",
            "description": "ID of the engine receiving the event"
          },
          {
            "$ref": "KeyboardEvent",
            "name": "keyData",
            "description": "Data on the key event"
          }
        ],
        "extraParameters": [
          {
            "type": "array",
            "optional": true,
            "name": "extraInfoSpec",
            "description": "Array of extra information that specifies how the callback is invoked.",
            "items": {
              "$ref": "CallbackStyle"
            }
          }
        ],
        "returns": {
          "type": "boolean",
          "description": "True if the keystroke was handled, false if not.  This function should always return a value if |async| is not specified.",
          "optional": true
        }
      },
      {
        "name": "onCandidateClicked",
        "type": "function",
        "description": "This event is sent if this extension owns the active IME.",
        "platforms": [
          "chromeos"
        ],
        "parameters": [
          {
            "type": "string",
            "name": "engineID",
            "description": "ID of the engine receiving the event"
          },
          {
            "type": "integer",
            "name": "candidateID",
            "description": "ID of the candidate that was clicked."
          },
          {
            "name": "button",
            "$ref": "MouseButton",
            "description": "Which mouse buttons was clicked."
          }
        ]
      },
      {
        "name": "onMenuItemActivated",
        "type": "function",
        "description": "Called when the user selects a menu item",
        "platforms": [
          "chromeos"
        ],
        "parameters": [
          {
            "type": "string",
            "name": "engineID",
            "description": "ID of the engine receiving the event"
          },
          {
            "type": "string",
            "name": "name",
            "description": "Name of the MenuItem which was activated"
          }
        ]
      },
      {
        "name": "onSurroundingTextChanged",
        "type": "function",
        "description": "Called when the editable string around caret is changed or when the caret position is moved. The text length is limited to 100 characters for each back and forth direction.",
        "platforms": [
          "chromeos"
        ],
        "parameters": [
          {
            "type": "string",
            "name": "engineID",
            "description": "ID of the engine receiving the event"
          },
          {
            "type": "object",
            "name": "surroundingInfo",
            "description": "The surrounding information.",
            "properties": {
              "text": {
                "type": "string",
                "description": "The text around the cursor. This is only a subset of all text in the input field."
              },
              "focus": {
                "type": "integer",
                "description": "The ending position of the selection. This value indicates caret position if there is no selection."
              },
              "anchor": {
                "type": "integer",
                "description": "The beginning position of the selection. This value indicates caret position if there is no selection."
              },
              "offset": {
                "type": "integer",
                "description": "The offset position of <code>text</code>. Since <code>text</code> only includes a subset of text around the cursor, offset indicates the absolute position of the first character of <code>text</code>."
              }
            }
          }
        ]
      },
      {
        "name": "onReset",
        "type": "function",
        "description": "This event is sent when chrome terminates ongoing text input session.",
        "platforms": [
          "chromeos",
          "win",
          "linux"
        ],
        "parameters": [
          {
            "type": "string",
            "name": "engineID",
            "description": "ID of the engine receiving the event"
          }
        ]
      },
      {
        "name": "onCompositionBoundsChanged",
        "type": "function",
        "description": "Triggered when the bounds of the IME composition text or cursor are changed. The IME composition text is the instance of text produced in the input method editor.",
        "platforms": [
          "win",
          "linux"
        ],
        "parameters": [
          {
            "type": "array",
            "name": "boundsList",
            "description": "List of bounds information for each character on IME composition text. If there's no composition text in the editor, this array contains the bound information of the cursor.",
            "items": {
              "$ref": "Bounds"
            }
          }
        ]
      }
    ],
    "dependencies": [
      "permission:input"
    ]
  },
  {
    "types": [
      {
        "id": "NetworkType",
        "type": "string",
        "enum": [
          "WiFi"
        ]
      },
      {
        "id": "NetworkInfo",
        "type": "object",
        "properties": {
          "Type": {
            "$ref": "NetworkType"
          },
          "GUID": {
            "type": "string",
            "nullable": true
          },
          "HexSSID": {
            "type": "string",
            "nullable": true
          },
          "SSID": {
            "type": "string",
            "nullable": true
          },
          "BSSID": {
            "type": "string",
            "nullable": true
          },
          "Security": {
            "type": "string",
            "nullable": true
          }
        }
      },
      {
        "id": "AuthenticationResult",
        "type": "string",
        "enum": [
          "unhandled",
          "succeeded",
          "rejected",
          "failed"
        ]
      }
    ],
    "functions": [
      {
        "name": "setNetworkFilter",
        "type": "function",
        "parameters": [
          {
            "type": "array",
            "items": {
              "$ref": "NetworkInfo"
            },
            "optional": false,
            "name": "networks"
          },
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": []
          }
        ],
        "static": false
      },
      {
        "name": "finishAuthentication",
        "type": "function",
        "parameters": [
          {
            "type": "string",
            "optional": false,
            "name": "GUID"
          },
          {
            "$ref": "AuthenticationResult",
            "optional": false,
            "name": "result"
          },
          {
            "optional": true,
            "name": "callback",
            "type": "function",
            "parameters": []
          }
        ],
        "static": false
      }
    ],
    "events": [
      {
        "name": "onCaptivePortalDetected",
        "type": "function",
        "parameters": [
          {
            "$ref": "NetworkInfo",
            "optional": false,
            "name": "networkInfo"
          }
        ]
      }
    ],
    "namespace": "networking.config",
    "dependencies": [
      "permission:networking.config"
    ]
  },
  {
    "types": [
      {
        "id": "Match",
        "type": "object",
        "properties": {
          "certificate": {
            "$ref": "ArrayBuffer"
          },
          "keyAlgorithm": {
            "type": "object"
          }
        }
      },
      {
        "id": "ClientCertificateType",
        "type": "string",
        "enum": [
          "rsaSign",
          "ecdsaSign"
        ]
      },
      {
        "id": "ClientCertificateRequest",
        "type": "object",
        "properties": {
          "certificateTypes": {
            "type": "array",
            "items": {
              "$ref": "ClientCertificateType"
            }
          },
          "certificateAuthorities": {
            "type": "array",
            "items": {
              "$ref": "ArrayBuffer"
            }
          }
        }
      },
      {
        "id": "SelectDetails",
        "type": "object",
        "properties": {
          "request": {
            "$ref": "ClientCertificateRequest"
          },
          "clientCerts": {
            "type": "array",
            "items": {
              "$ref": "ArrayBuffer"
            },
            "nullable": true
          },
          "interactive": {
            "type": "boolean"
          }
        }
      },
      {
        "id": "VerificationDetails",
        "type": "object",
        "properties": {
          "serverCertificateChain": {
            "type": "array",
            "items": {
              "$ref": "ArrayBuffer"
            }
          },
          "hostname": {
            "type": "string"
          }
        }
      },
      {
        "id": "VerificationResult",
        "type": "object",
        "properties": {
          "trusted": {
            "type": "boolean"
          },
          "debug_errors": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        }
      }
    ],
    "functions": [
      {
        "name": "selectClientCertificates",
        "type": "function",
        "parameters": [
          {
            "$ref": "SelectDetails",
            "optional": false,
            "name": "details"
          },
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "type": "array",
                "items": {
                  "$ref": "Match"
                },
                "optional": false,
                "name": "matches"
              }
            ]
          }
        ],
        "static": true
      },
      {
        "name": "getKeyPair",
        "type": "function",
        "parameters": [
          {
            "$ref": "ArrayBuffer",
            "optional": false,
            "name": "certificate"
          },
          {
            "type": "object",
            "optional": false,
            "name": "parameters"
          },
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "type": "object",
                "optional": false,
                "name": "publicKey"
              },
              {
                "type": "object",
                "optional": true,
                "name": "privateKey"
              }
            ]
          }
        ],
        "static": true
      },
      {
        "name": "subtleCrypto",
        "type": "function",
        "static": true
      },
      {
        "name": "verifyTLSServerCertificate",
        "type": "function",
        "parameters": [
          {
            "$ref": "VerificationDetails",
            "optional": false,
            "name": "details"
          },
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "$ref": "VerificationResult",
                "optional": false,
                "name": "result"
              }
            ]
          }
        ],
        "static": true
      }
    ],
    "namespace": "platformKeys",
    "dependencies": [
      "permission:platformKeys"
    ]
  },
  {
    "types": [
      {
        "id": "Parameters",
        "type": "object",
        "properties": {
          "address": {
            "type": "string"
          },
          "broadcastAddress": {
            "type": "string",
            "nullable": true
          },
          "mtu": {
            "type": "string",
            "nullable": true
          },
          "exclusionList": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "inclusionList": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "domainSearch": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "nullable": true
          },
          "dnsServers": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "reconnect": {
            "type": "string",
            "nullable": true
          }
        }
      },
      {
        "id": "PlatformMessage",
        "type": "string",
        "enum": [
          "connected",
          "disconnected",
          "error",
          "linkDown",
          "linkUp",
          "linkChanged",
          "suspend",
          "resume"
        ]
      },
      {
        "id": "VpnConnectionState",
        "type": "string",
        "enum": [
          "connected",
          "failure"
        ]
      },
      {
        "id": "UIEvent",
        "type": "string",
        "enum": [
          "showAddDialog",
          "showConfigureDialog"
        ]
      }
    ],
    "functions": [
      {
        "name": "createConfig",
        "type": "function",
        "parameters": [
          {
            "type": "string",
            "optional": false,
            "name": "name"
          },
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": [
              {
                "type": "string",
                "optional": false,
                "name": "id"
              }
            ]
          }
        ],
        "static": true
      },
      {
        "name": "destroyConfig",
        "type": "function",
        "parameters": [
          {
            "type": "string",
            "optional": false,
            "name": "id"
          },
          {
            "optional": true,
            "name": "callback",
            "type": "function",
            "parameters": []
          }
        ],
        "static": true
      },
      {
        "name": "setParameters",
        "type": "function",
        "parameters": [
          {
            "$ref": "Parameters",
            "optional": false,
            "name": "parameters"
          },
          {
            "optional": false,
            "name": "callback",
            "type": "function",
            "parameters": []
          }
        ],
        "static": true
      },
      {
        "name": "sendPacket",
        "type": "function",
        "parameters": [
          {
            "$ref": "ArrayBuffer",
            "optional": false,
            "name": "data"
          },
          {
            "optional": true,
            "name": "callback",
            "type": "function",
            "parameters": []
          }
        ],
        "static": true
      },
      {
        "name": "notifyConnectionStateChanged",
        "type": "function",
        "parameters": [
          {
            "$ref": "VpnConnectionState",
            "optional": false,
            "name": "state"
          },
          {
            "optional": true,
            "name": "callback",
            "type": "function",
            "parameters": []
          }
        ],
        "static": true
      }
    ],
    "events": [
      {
        "name": "onPlatformMessage",
        "type": "function",
        "parameters": [
          {
            "type": "string",
            "optional": false,
            "name": "id"
          },
          {
            "$ref": "PlatformMessage",
            "optional": false,
            "name": "message"
          },
          {
            "type": "string",
            "optional": false,
            "name": "error"
          }
        ]
      },
      {
        "name": "onPacketReceived",
        "type": "function",
        "parameters": [
          {
            "$ref": "ArrayBuffer",
            "optional": false,
            "name": "data"
          }
        ]
      },
      {
        "name": "onConfigRemoved",
        "type": "function",
        "parameters": [
          {
            "type": "string",
            "optional": false,
            "name": "id"
          }
        ]
      },
      {
        "name": "onConfigCreated",
        "type": "function",
        "parameters": [
          {
            "type": "string",
            "optional": false,
            "name": "id"
          },
          {
            "type": "string",
            "optional": false,
            "name": "name"
          },
          {
            "type": "object",
            "optional": false,
            "name": "data"
          }
        ]
      },
      {
        "name": "onUIEvent",
        "type": "function",
        "parameters": [
          {
            "$ref": "UIEvent",
            "optional": false,
            "name": "event"
          },
          {
            "type": "string",
            "optional": true,
            "name": "id"
          }
        ]
      }
    ],
    "namespace": "vpnProvider",
    "dependencies": [
      "permission:vpnProvider"
    ]
  },
  {
    "namespace": "wallpaper",
    "compiler_options": {
      "implemented_in": "chrome/browser/chromeos/extensions/wallpaper_api.h"
    },
    "description": "Use the <code>chrome.wallpaper</code> API to change the ChromeOS wallpaper.",
    "types": [
      {
        "id": "WallpaperLayout",
        "type": "string",
        "enum": [
          "STRETCH",
          "CENTER",
          "CENTER_CROPPED"
        ],
        "description": "The supported wallpaper layouts."
      }
    ],
    "functions": [
      {
        "name": "setWallpaper",
        "type": "function",
        "description": "Sets wallpaper to the image at <em>url</em> or <em>wallpaperData</em> with the specified <em>layout</em>",
        "parameters": [
          {
            "name": "details",
            "type": "object",
            "properties": {
              "data": {
                "type": "binary",
                "optional": true,
                "description": "The jpeg or png encoded wallpaper image as an ArrayBuffer."
              },
              "url": {
                "type": "string",
                "optional": true,
                "description": "The URL of the wallpaper to be set (can be relative)."
              },
              "layout": {
                "$ref": "WallpaperLayout",
                "description": "The supported wallpaper layouts."
              },
              "filename": {
                "type": "string",
                "description": "The file name of the saved wallpaper."
              },
              "thumbnail": {
                "type": "boolean",
                "optional": true,
                "description": "True if a 128x60 thumbnail should be generated. Layout and ratio are not supported yet."
              }
            }
          },
          {
            "type": "function",
            "name": "callback",
            "parameters": [
              {
                "type": "binary",
                "optional": true,
                "name": "thumbnail",
                "description": "The jpeg encoded wallpaper thumbnail. It is generated by resizing the wallpaper to 128x60."
              }
            ]
          }
        ]
      }
    ],
    "dependencies": [
      "permission:wallpaper"
    ]
  }
]