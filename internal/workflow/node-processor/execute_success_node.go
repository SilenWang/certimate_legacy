package nodeprocessor

import (
	"context"

	"github.com/usual2970/certimate/internal/domain"
)

type executeSuccessNode struct {
	node *domain.WorkflowNode
	*nodeLogger
}

func NewExecuteSuccessNode(node *domain.WorkflowNode) *executeSuccessNode {
	return &executeSuccessNode{
		node:       node,
		nodeLogger: NewNodeLogger(node),
	}
}

func (n *executeSuccessNode) Process(ctx context.Context) error {
	// 此类型节点不需要执行任何操作，直接返回
	n.AddOutput(ctx, n.node.Name, "进入执行成功分支")

	return nil
}
