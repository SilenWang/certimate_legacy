import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  CloudUploadOutlined as CloudUploadOutlinedIcon,
  PlusOutlined as PlusOutlinedIcon,
  SendOutlined as SendOutlinedIcon,
  SisternodeOutlined as SisternodeOutlinedIcon,
  SolutionOutlined as SolutionOutlinedIcon,
} from "@ant-design/icons";
import { Dropdown } from "antd";

import { WorkflowNodeType, newNode } from "@/domain/workflow";
import { useZustandShallowSelector } from "@/hooks";
import { useWorkflowStore } from "@/stores/workflow";

import { type SharedNodeProps } from "./_SharedNode";

export type AddNodeProps = SharedNodeProps;

const AddNode = ({ node, disabled }: AddNodeProps) => {
  const { t } = useTranslation();

  const { addNode } = useWorkflowStore(useZustandShallowSelector(["addNode"]));

  const dropdownMenus = useMemo(() => {
    return [
      [WorkflowNodeType.Apply, "workflow_node.apply.label", <SolutionOutlinedIcon />],
      [WorkflowNodeType.Deploy, "workflow_node.deploy.label", <CloudUploadOutlinedIcon />],
      [WorkflowNodeType.Branch, "workflow_node.branch.label", <SisternodeOutlinedIcon />],
      [WorkflowNodeType.ExecuteResultBranch, "workflow_node.execute_result_branch.label", <SisternodeOutlinedIcon />],
      [WorkflowNodeType.Notify, "workflow_node.notify.label", <SendOutlinedIcon />],
    ]
      .filter(([type]) => {
        if (node.type !== WorkflowNodeType.Apply && node.type !== WorkflowNodeType.Deploy && type === WorkflowNodeType.ExecuteResultBranch) {
          return false;
        }

        return true;
      })
      .map(([type, label, icon]) => {
        return {
          key: type as string,
          disabled: disabled,
          label: t(label as string),
          icon: icon,
          onClick: () => {
            const nextNode = newNode(type as WorkflowNodeType);
            addNode(nextNode, node.id);
          },
        };
      });
  }, [node.id, disabled, node.type]);

  return (
    <div className="relative py-6 before:absolute before:left-1/2 before:top-0 before:h-full before:w-[2px] before:-translate-x-1/2 before:bg-stone-200 before:content-['']">
      <Dropdown menu={{ items: dropdownMenus }} trigger={["click"]}>
        <div className="relative z-[1] flex size-5 cursor-pointer items-center justify-center rounded-full bg-stone-400 hover:bg-stone-500">
          <PlusOutlinedIcon className="text-white" />
        </div>
      </Dropdown>
    </div>
  );
};

export default memo(AddNode);
