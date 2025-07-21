import { Button, Radio, Tag } from "ant-design-vue";
import { ColumnsType } from "ant-design-vue/lib/table";
import { computed, defineComponent, ref } from "vue";
import {
  DataList,
  DataListProps,
  JSONFormItemType,
  NumberRange,
  PageData,
  SearchbarProps,
  useSearch,
} from "../component";
import LabelComponent from "../JSONForm/LabelComponent";
import "./index.less";

const radioStyle = { marginRight: "10px", marginBottom: "10px" };

let data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
    desc: "近年来，网络直播在促进灵活就业、服务经济发展等方面发挥了重要作用。同时，网络直播营利行为也存在网络直播平台管理责任不到位、商业营销行为不规范、偷逃缴纳税款等问题，制约行业健康发展，损害社会公平正义。",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
    desc: "近年来，网络直播在促进灵活就业、服务经济发展等方面发挥了重要作用。同时，网络直播营利行为也存在网络直播平台管理责任不到位、商业营销行为不规范、偷逃缴纳税款等问题，制约行业健康发展，损害社会公平正义。",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
    desc: "近年来，网络直播在促进灵活就业、服务经济发展等方面发挥了重要作用。同时，网络直播营利行为也存在网络直播平台管理责任不到位、商业营销行为不规范、偷逃缴纳税款等问题，制约行业健康发展，损害社会公平正义。",
  },
];

for (let i = 0; i < 5; i++) {
  const random = Math.random().toString(32).slice(3, 6);
  data = data.concat(
    data.map((item) => ({
      ...item,
      name: `${item.name}-${random}`,
      key: `${item.name}-${random}`,
    }))
  );
}

export default defineComponent({
  name: "DataListDemo",
  setup() {
    const showAgeColumn = ref<boolean>(true);
    const columns = computed(() => {
      const items: ColumnsType = [
        {
          title: "name",
          dataIndex: "name",
          key: "name",
          fixed: "left",
          customRender({ text }) {
            return <a href="#">{text}</a>;
          },
        },
        {
          title: "Age",
          dataIndex: "age",
          key: "age",
          colSpan: showAgeColumn.value ? 1 : 0,
        },
        {
          title: "Address",
          dataIndex: "address",
          key: "address",
        },
        {
          title: "Tags",
          key: "tags",
          dataIndex: "tags",
          customRender({ value }) {
            return (value || []).map((item: string) => <Tag>{item}</Tag>);
          },
        },
        {
          title: "Desc",
          key: "desc",
          dataIndex: "desc",
          width: 400,
        },
        {
          title: "Action",
          key: "action",
          fixed: "right",
          customRender() {
            return (
              <div>
                <a-button type="link">操作1</a-button>
                <a-button type="link">操作2</a-button>
              </div>
            );
          },
        },
      ];
      return items;
    });
    const searchOptions: JSONFormItemType[] = [
      {
        type: "input",
        label: "姓名",
        field: "name",
        rules: [
          {
            required: false,
          },
        ],
      },
      {
        type: "select",
        label: "下拉",
        field: "targetSelect",
        attrs: {
          options: [
            {
              label: "目标字段可编辑",
              value: 0,
            },
            {
              label: "目标字段禁用",
              value: 1,
            },
          ],
        },
      },
      {
        type: "cascader",
        label: "级联",
        field: "targetCascader",
        attrs: {
          options: [
            {
              label: "目标字段可编辑",
              value: 0,
              children: [
                {
                  value: "hangzhou",
                  label: "Hangzhou",
                  children: [
                    {
                      value: "xihu",
                      label: "West Lake",
                    },
                  ],
                },
              ],
            },
            {
              label: "目标字段禁用",
              value: 1,
            },
          ],
        },
      },
      {
        type: "select",
        label: "4S店筛选",
        field: "storeId",
        attrs: {
          placeholder: "请选择4S店",
          options: [
            {
              label: "全部",
              value: 0,
            },
            {
              label: "目标字段禁用",
              value: 1,
            },
          ],
        },
      },
      {
        type: "component",
        component: NumberRange,
        span: 12,
        label: "积分变动值区间",
        field: "pointsNumberStart",
        initialValue: [],
        params: {
          useRangeField: true,
          startFieldName: "pointsNumberStart",
          endFieldName: "pointsNumberEnd",
          startInputAttrs: {
            maxlength: 10,
            precision: 0,
            min: 0,
          },
          endInputAttrs: {
            maxlength: 10,
            precision: 0,
            min: 0,
          },
        },
      },
      {
        type: "input",
        label: "车架号",
        field: "vin",
        attrs: {
          placeholder: "请输入车架号",
        },
      },
      {
        type: "input",
        label: "联系人",
        field: "contact",
        attrs: {
          placeholder: "请输入姓名或手机号",
        },
      },
      {
        type: "input",
        label: <LabelComponent></LabelComponent>,
        labelWidth: 50,
        field: "labeled",
      },
      {
        type: "select",
        label: "状态",
        field: "status",
        attrs: {
          // 线索状态（PENDING：待处理，FOLLOWING：跟进中,VALID有效，INVALID无效）
          options: [
            {
              label: "待处理",
              value: "PENDING",
            },
            {
              label: "跟进中",
              value: "FOLLOWING",
            },
            {
              label: "有效",
              value: "VALID",
            },
            {
              label: "无效",
              value: "INVALID",
            },
          ],
        },
      },
      {
        type: "select",
        label: "事故类型",
        field: "accidentType",
        attrs: {
          // 事故类型（CONFIRM：确认事故，SUSPECTED：疑似事故，WITHOUT：非事故）
          options: [
            {
              label: "确认事故",
              value: "CONFIRM",
            },
            {
              label: "疑似事故",
              value: "SUSPECTED",
            },
            {
              label: "非事故",
              value: "WITHOUT",
            },
          ],
        },
      },
      {
        type: "select",
        label: "碰撞等级",
        field: "collisionLevel",
        attrs: {
          // 碰撞等级(UNKNOWN：未知,A,AA,AAA,AAAA)
          options: [
            {
              label: "未知",
              value: "UNKNOWN",
            },
            {
              label: "A",
              value: "A",
            },
            {
              label: "AA",
              value: "AA",
            },
            {
              label: "AAA",
              value: "AAA",
            },
            {
              label: "AAAA",
              value: "AAAA",
            },
          ],
        },
      },
      {
        type: "daterange",
        label: "事故触发时间",
        field: "OccurTime",
      },
      {
        type: "daterange",
        label: "线索接受时间",
        field: "ReceiveTime",
      },
      {
        type: "select",
        label: "事故视频",
        field: "hasVideo",
        attrs: {
          options: [
            {
              label: "有视频",
              value: true,
            },
            {
              label: "无视频",
              value: false,
            },
          ],
        },
      },
    ];
    const searchbarInstance = ref();
    const filterData = ref<PageData["list"]>([]);
    const total = ref(0);
    const showSearch = ref(true);
    const pagination = ref(true);
    const showTip = ref(true);
    const showCustomSearchbar = ref(false);
    const showCustomTable = ref(false);
    const search = useSearch<PageData>(
      (params?: Record<string, any>) => {
        let res;
        if (params?.name) {
          res = data.filter((item) => item.name.includes(params.name));
        } else {
          res = data;
        }
        total.value = res.length;
        return {
          list: res.slice(
            (params?.pageNum - 1) * params?.pageSize,
            params?.pageNum * params?.pageSize
          ),
          total: res.length,
        };
      },
      {
        success: (res) => {
          filterData.value = res.list;
        },
      }
    );
    const searchbarProps: SearchbarProps = {
      jsonformAttrs: {
        formItems: searchOptions,
      },
      // beforeReset(form) {
      //   return {
      //     onlyRest: true
      //   }
      // },
    };

    const reset = () => {
      if (searchbarInstance.value) {
        searchbarInstance.value.reset();
      }
    };

    const customeSearchbarDom = (
      <div
        style={{
          padding: "20px",
        }}
      >
        <Button onClick={() => reset()}>自定义重置</Button>
        <Button onClick={() => search()}>自定义查询</Button>
      </div>
    );

    const customTableDom = (
      <div
        style={{
          padding: "20px",
        }}
      >
        自定义table
      </div>
    );

    return () => {
      const props: DataListProps = {
        tableProps: {
          columns: columns.value,
          dataSource: filterData.value,
          pagination: pagination.value ? { total: total.value } : false,
        },
        customSearchbar: showCustomSearchbar.value
          ? customeSearchbarDom
          : undefined,
        showSearch: showSearch.value,
        searchbarProps,
        columnElipsis: showTip.value ? { line: 1 } : false,
        getSearchbarInstance: (ins) => {
          searchbarInstance.value = ins;
        },
        search,
        toolbar: (
          <div>
            <Button onClick={reset}>手动重置</Button>
            <Button
              onClick={() => (showAgeColumn.value = !showAgeColumn.value)}
            >
              切换列表column展示
            </Button>
          </div>
        ),
      };
      return (
        <div class="datalist-demo">
          <fieldset
            style={{
              border: "1px solid #efefef",
              padding: "0 20px",
              marginBottom: "20px",
            }}
          >
            <legend
              style={{ width: "auto", fontSize: "14px", margin: "0 10px" }}
            >
              属性演示
            </legend>
            <Radio.Group
              onChange={(e) => {
                showSearch.value = e.target.value;
              }}
              style={radioStyle}
              v-model={[showSearch.value, "value"]}
            >
              <Radio.Button value={true}>显示搜索栏</Radio.Button>
              <Radio.Button value={false}>隐藏搜索栏</Radio.Button>
            </Radio.Group>
            <Radio.Group
              onChange={(e) => {
                pagination.value = e.target.value;
              }}
              style={radioStyle}
              v-model={[pagination.value, "value"]}
            >
              <Radio.Button value={true}>显示分页</Radio.Button>
              <Radio.Button value={false}>隐藏分页</Radio.Button>
            </Radio.Group>
            <Radio.Group
              onChange={(e) => {
                showTip.value = e.target.value;
              }}
              style={radioStyle}
              v-model={[showTip.value, "value"]}
            >
              <Radio.Button value={true}>长文本显示省略号</Radio.Button>
              <Radio.Button value={false}>显示完整长文本</Radio.Button>
            </Radio.Group>
            <Radio.Group
              onChange={(e) => {
                showCustomSearchbar.value = e.target.value;
              }}
              style={radioStyle}
              v-model={[showCustomSearchbar.value, "value"]}
            >
              <Radio.Button value={true}>自定义seachBar插槽</Radio.Button>
              <Radio.Button value={false}>默认searchBar</Radio.Button>
            </Radio.Group>
            <Radio.Group
              onChange={(e) => {
                showCustomTable.value = e.target.value;
              }}
              style={radioStyle}
              v-model={[showCustomTable.value, "value"]}
            >
              <Radio.Button value={true}>自定义Table插槽</Radio.Button>
              <Radio.Button value={false}>默认Table</Radio.Button>
            </Radio.Group>
          </fieldset>

          <div style="background-color: #efefef; padding: 20px">
            <DataList {...props}>
              {{
                customTable: () =>
                  showCustomTable.value ? customTableDom : undefined,
              }}
            </DataList>
          </div>
        </div>
      );
    };
  },
});