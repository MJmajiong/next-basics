import React from "react";
import AceEditor, { IAceOptions } from "react-ace";
import { message } from "antd";
import { assign } from "lodash";
import { BrickConf } from "@next-core/brick-types";
import { Clipboard } from "@next-libs/clipboard";

import yaml from "js-yaml";
import brace from "brace";
import "brace/mode/json";
import "brace/theme/github";
import "brace/mode/yaml";
import "brace/theme/monokai";
import "brace/ext/language_tools";

import cssStyle from "./style.module.css";

interface BrickEditorProps {
  defaultConf: BrickConf;
  onConfChange: (conf: BrickConf) => void;
  aceSetOptions?: IAceOptions;
  mode: string;
}

export function BrickEditor({
  defaultConf,
  onConfChange,
  aceSetOptions,
  mode,
}: BrickEditorProps): React.ReactElement {
  const aceRef = React.useRef(null);
  const [valid, setValid] = React.useState(true);
  const changed = React.useRef(false);
  const [confString, setConfString] = React.useState("");
  const defaultAceSetOptions = {
    showLineNumbers: true,
    maxLines: Infinity,
    minLines: 5,
    tabSize: 2,
    printMargin: false,
    highlightActiveLine: false,
    highlightGutterLine: false,
    enableBasicAutocompletion: true,
    // enableSnippets: true,
    enableLiveAutocompletion: true,
  };

  const parse = (value: string, tryMode = mode): BrickConf => {
    let brickConf: BrickConf;
    if (value) {
      try {
        if (tryMode === "json") {
          brickConf = JSON.parse(value);
        } else {
          brickConf = yaml.safeLoad(value, {
            schema: yaml.JSON_SCHEMA,
            json: true,
          }) as BrickConf;
        }
        setValid(true);
      } catch (e) {
        setValid(false);
      }
    } else {
      setValid(true);
    }
    return brickConf;
  };

  const serialize = (brickConf: BrickConf): string => {
    let content = "";
    if (brickConf) {
      if (mode === "json") {
        content = JSON.stringify(brickConf, null, 2);
      } else {
        content = yaml.safeDump(brickConf, {
          schema: yaml.JSON_SCHEMA,
          skipInvalid: true,
          noRefs: true,
          noCompatMode: true,
        });
      }
    }
    return content;
  };

  const onButtonCopy = (text: string, success: boolean): void => {
    if (success) {
      message.success("复制成功");
    } else {
      message.error("复制失败");
    }
  };

  const setOptions = assign({}, defaultAceSetOptions, aceSetOptions);
  const handleStoryChange = (value: string): void => {
    changed.current = true;
    setConfString(value);

    parse(value);
  };

  const handleStoryBlur = (): void => {
    if (!changed.current) {
      return;
    }
    changed.current = false;
    const conf = parse(confString);
    if (conf) onConfChange(conf);
  };

  React.useEffect(() => {
    const content = serialize(defaultConf);
    setConfString(content);
  }, [mode]);

  React.useEffect(() => {
    const langTools = brace.acequire("ace/ext/language_tools");

    // TODO: use autotask to read the folder and create the config Data;
    // mock data:
    const bricksConf = [
      {
        name: "presentational-bricks",
        description: "bricks",
        props: [
          {
            name: "brick-alert",
            description: "弹框",
            props: [
              {
                name: "properties",
                description: "属性",
                props: [{ name: "width" }, { name: "height" }],
              },
              {
                name: "events",
                description: "事件",
                props: [
                  { name: "event.change.success" },
                  { name: "event.change.fail" },
                ],
              },
            ],
          },
          { name: "brick-button", description: "按钮" },
          { name: "brick-code-display", description: "代码展示框" },
          { name: "brick-test", description: "测试" },
        ],
      },
      {
        name: "forms",
        description: "forms",
        props: [
          {
            name: "cmdb-instance-select",
            description: "实例选择",
            props: [
              {
                name: "properties",
                description: "属性",
                props: [{ name: "width" }, { name: "height" }],
              },
              {
                name: "events",
                description: "事件",
                props: [
                  { name: "event.change.success" },
                  { name: "event.change.fail" },
                ],
              },
            ],
          },
          {
            name: "form-modal",
            description: "表单modal",
            props: [
              {
                name: "properties",
                description: "属性",
                props: [{ name: "visiable" }, { name: "title" }],
              },
              {
                name: "events",
                description: "事件",
                props: [
                  { name: "modal.open", icon: "event" },
                  { name: "modal.close", icon: "event" },
                ],
              },
            ],
          },
          { name: "general-modal", description: "通常modal" },
          { name: "general-buttons", description: "通用按钮" },
        ],
      },
    ];

    // 可以获取前面的空格, 并与上一行做对比, 如果是属于brick下的属性, 可以联动带出来数据;
    const brickReg =
      /(?<isBricks>brick: )(?<brick>([\w|\W]+)\.)?(?<component>[\w|\W]+)?/;

    const getSpaceNums = (line: string): number =>
      line.length - line.trimLeft().length;

    const getRealBrick = (editor: brace.Editor, pos: brace.Position) => {
      let brick;
      let propsName;
      /**
       * 获取属性步骤
       * 1. 获取当前line
       * 2. 记录当前line前面空格数, 记录为spaceNum
       * 3. 往上寻找, 当前一行空格数小于当前行空格数, 则说明上一行为当前行父级,
       *    并记录propsName
       * 4. 往上寻找, 直至通过brickReg正则获取到当前使用到brick, 跳出循环
       *    并记录为realBrick
       */
      const curLine = editor.session.getLine(pos.row);
      const curSpaceNums = getSpaceNums(curLine);
      let hasGetProps = false;
      while (pos.row > 0) {
        pos.row--;

        const prevLine = editor.session.getLine(pos.row);
        brick = prevLine.match(brickReg);

        if (!hasGetProps && getSpaceNums(prevLine) < curSpaceNums) {
          hasGetProps = true;
          propsName = prevLine.match(/[\w]+/)?.[0];
        }
        if (brick) break;
      }
      // console.log('寻找到组件', brick?.groups);
      // console.log('寻找到属性', propsName);
      return {
        realBrick: brick?.groups ?? {},
        propsName,
      };
    };

    // TODO: change the Variable name
    const getRealComponent = (
      brick: string,
      component?: string,
      propsName?: string
    ): any[] => {
      const brickItem = bricksConf.find(
        (item) => item.name === brick.substr(0, brick.length - 1)
      );
      if (brickItem?.props && component) {
        const comp = brickItem.props.find((item) => item.name === component);
        if (comp?.props && propsName) {
          const compProps = comp.props.find((item) => item.name === propsName);
          if ((compProps?.props ?? []).length) {
            let snippets = "";
            compProps.props.forEach((item: any) => {
              snippets += `${item.name}: ${item.defaultValue ?? ""}\n`;
            });
            return compProps.props.concat([
              {
                name: "useDefaultProp",
                snippet: snippets,
                meta: "默认值代码片段",
                type: "snippet",
              },
            ]);
          }
          return [];
        }
        return comp?.props ?? [];
      }
      return brickItem?.props ?? [];
    };

    const getConf = (
      editor: brace.Editor,
      pos: brace.Position,
      _prefix?: string
    ): any[] => {
      const curLine: string = editor.session.getLine(pos.row);
      const matchBrick: null | RegExpMatchArray = curLine.match(brickReg);
      // 当前行匹配中brick
      if (matchBrick) {
        const { isBricks, brick } = matchBrick.groups;
        if (isBricks && !brick) {
          return bricksConf;
        }
        if (brick) {
          const comp = getRealComponent(brick);
          return comp.map((item) => {
            return {
              ...item,
              name: `${brick}${item?.name}`,
            };
          });
        }
      }

      // 如果当前行匹配不到, 需要往上寻找, 直至找到使用brick
      // 获取到使用brick后, 需要找到当前使用的是属于那种属性
      const { realBrick, propsName } = getRealBrick(editor, pos);
      const { isBricks, brick, component } = realBrick;
      if (isBricks && brick && component) {
        return getRealComponent(brick, component, propsName);
      }

      return [];
    };
    // 自定义代码补全 & 自定义代码片段
    const autoCompleteCompleter = {
      identifierRegexps: [/[a-zA-Z_0-9.\\$\-\u00A2-\uFFFF]/],
      getCompletions: (
        editor: brace.Editor,
        _session: brace.IEditSession,
        pos: brace.Position,
        prefix: string,
        callback: any
      ): void => {
        // console.log(
        //   `editor: ${editor}\n`,
        //   `session: ${session}\n`,
        //   `pos: ${pos}\n`,
        //   `prefix: ${prefix}\n`,
        // )
        callback(
          null,
          getConf(editor, pos, prefix).map((completerItem) => ({
            ...completerItem,
            caption: `${completerItem.name}: ${
              completerItem.description ?? ""
            }`,
            value: completerItem.name,
            score: 100, // 位置权重
          }))
        );
      },
    };
    // // 自定义代码片段
    // const autoSnippetCompleter = {
    //   getCompletions: (
    //       editor: brace.Editor,
    //       _session: brace.IEditSession,
    //       pos: brace.Position,
    //       prefix: string,
    //       callback: any
    //   ): void => {
    //     callback(null, [{
    //         "caption": "test",
    //         "snippet": "test: 1",
    //         "meta": "自定义代码片段",
    //         "type": "snippet"
    //     }])
    //   },
    // };

    const myCustomCompleter = [
      autoCompleteCompleter,
      // autoSnippetCompleter,
    ];

    /**
     * ace提供两种方法修改completers
     * - addCompleter:  使用默认 [snippetCompleter, textCompleter, keyWordCompleter] 三个completer
     * - setCompleters: 会清空默认completer, 使用用户自定义的completer进行解析
     * (tips: 也可以通过例如: const { snippetCompleter } = langTools 直接修改默认completer)
     */
    langTools.setCompleters(myCustomCompleter);
    // myCustomCompleter.forEach(completer => {
    //   langTools.addCompleter(completer);
    // })
  }, []);

  return (
    <div
      className={cssStyle.editorCard}
      style={{ boxShadow: valid ? "none" : "red 0px 0px 3px 1px" }}
    >
      <AceEditor
        ref={aceRef}
        theme="monokai"
        mode={mode}
        showGutter={true}
        value={confString}
        width="100%"
        editorProps={{ $blockScrolling: Infinity }}
        setOptions={setOptions}
        onChange={handleStoryChange}
        debounceChangePeriod={100}
        onBlur={handleStoryBlur}
      />
      <div className={cssStyle.copyIcon}>
        <Clipboard
          text={confString}
          onCopy={onButtonCopy}
          icon={{ theme: "outlined" }}
        />
      </div>
    </div>
  );
}
