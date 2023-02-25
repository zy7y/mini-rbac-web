import { defineComponent, h, ref, toRefs } from 'vue'
import { Col, Form, Input, Row, Select, Tree, TreeSelect } from 'ant-design-vue'
import type { FormPlusProps, IFormPlusItem } from './type'
import type { FormInstance } from 'ant-design-vue/es/form'

/**
 * form 组件二次封装
 */

export default defineComponent({
  props: ['label', 'model', 'row', 'columns'],
  setup(props: FormPlusProps, { expose }) {
    const { layout, model, row, columns } = toRefs(props)

    const antFormInstance = ref<FormInstance>()

    // render item
    const renderFormItem = (item: IFormPlusItem) => {
      // 输入框
      if (item.itemType == 'input') {
        return (
          <Input
            v-model:value={model.value[item?.name]}
            type={item?.type}
            placeholder={item?.placeholder}
            v-slots={item?.solts}
            disabled={item?.disabled}
            style={item?.style}
          ></Input>
        )
      }

      // select
      if (item?.itemType == 'select') {
        return (
          <Select
            v-model:value={model.value[item?.name]}
            options={item?.options}
            mode={item?.mode}
            size={item?.size}
            placeholder={item?.placeholder}
            disabled={item?.disabled}
            style={item?.style}
          ></Select>
        )
      }

      // select 兼容icon
      if (item?.itemType == 'select-icon') {
        return (
          <Select
            v-model:value={model.value[item?.name]}
            mode={item?.mode}
            size={item?.size}
            placeholder={item?.placeholder}
            disabled={item?.disabled}
            style={item?.style}
            filterOption={item?.filterOption}
            showSearch={item?.showSearch}
          >
            {item?.options?.map((option) => (
              <Select.Option value={option.value}>
                {h(item?.icons[option.label])}
                {option.label}
              </Select.Option>
            ))}
          </Select>
        )
      }

      // tree select
      if (item?.itemType == 'tree-select') {
        return (
          <TreeSelect
            v-model:value={model.value[item?.name]}
            showSearch={item?.showSearch}
            dropdownStyle={item?.dropdownStyle}
            treeData={item.treeData}
            fieldNames={item.fieldNames}
            disabled={item?.disabled}
            placeholder={item?.placeholder}
            filterTreeNode={item?.filterTreeNode}
          ></TreeSelect>
        )
      }

      // tree
      if (item?.itemType == 'tree') {
        return (
          <Tree
            checkable={item.checkable}
            treeData={item.treeData}
            fieldNames={item.fieldNames}
            onCheck={item.onCheck}
            v-model:checkedKeys={item.checkedKeys}
            v-model:expandedKeys={item.expandedKeys}
            v-model:selectedKeys={item.selectedKeys}
            disabled={item?.disabled}
          />
        )
      }
    }

    expose({
      antFormInstance
    })

    return () => (
      <div>
        <Form ref={antFormInstance} layout={layout?.value} model={model?.value}>
          <Row {...row?.value}>
            {columns?.value.map((item) => (
              <Col {...item?.col}>
                <Form.Item
                  label={item?.label}
                  hidden={item?.hidden}
                  rules={item?.rules}
                  name={item?.name}
                >
                  {renderFormItem(item)}
                </Form.Item>
              </Col>
            ))}
          </Row>
        </Form>
      </div>
    )
  }
})
