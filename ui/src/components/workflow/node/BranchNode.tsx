import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "antd";

import { type WorkflowNode } from "@/domain/workflow";
import { useZustandShallowSelector } from "@/hooks";
import { useWorkflowStore } from "@/stores/workflow";

import NodeRender from "../NodeRender";
import AddNode from "./AddNode";

export type BrandNodeProps = {
  node: WorkflowNode;
};

const BranchNode = ({ node }: BrandNodeProps) => {
  const { t } = useTranslation();

  const { addBranch } = useWorkflowStore(useZustandShallowSelector(["addBranch"]));

  const renderNodes = (node: WorkflowNode, branchNodeId?: string, branchIndex?: number) => {
    const elements: JSX.Element[] = [];

    let current = node as WorkflowNode | undefined;
    while (current) {
      elements.push(<NodeRender key={current.id} node={current} branchId={branchNodeId} branchIndex={branchIndex} />);
      current = current.next;
    }

    return elements;
  };

  return (
    <>
      <div className="relative flex gap-x-16 before:absolute before:inset-x-[128px] before:top-0 before:h-[2px] before:bg-stone-200 before:content-['']">
        <Button
          className="absolute left-[50%] z-[1] -translate-x-1/2 -translate-y-1/2 text-xs"
          size="small"
          shape="round"
          variant="outlined"
          onClick={() => {
            addBranch(node.id);
          }}
        >
          {t("workflow_node.action.add_branch")}
        </Button>

        {node.branches!.map((branch, index) => (
          <div
            key={branch.id}
            className="relative flex flex-col items-center before:absolute  before:left-[50%] before:top-0 before:h-full before:w-[2px] before:-translate-x-[50%] before:bg-stone-200 before:content-['']"
          >
            <div className="relative flex flex-col items-center">{renderNodes(branch, node.id, index)}</div>
          </div>
        ))}
      </div>

      <AddNode node={node} />
    </>
  );
};

export default memo(BranchNode);
