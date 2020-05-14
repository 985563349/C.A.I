# el-easy-table

基于el-table二次封装的table组件，可根据配置快速生成table

## 实现功能

- [x] 列配置
- [x] 筛选控件配置
- [ ] 工具栏
- [x] 工具栏按钮配置
- [x] 批量操作按钮配置
- [x] 行操作按钮配置
- [x] 分页配置
- [ ] 数据单选
- [ ] 数据多选
- [x] loading
- [x] 事件绑定
- [ ] 分页勾选记忆
- [ ] 分页删除数据处理
- [x] 按钮显隐控制



## 配置参数

### Attributes

表格配置

|        参数         |                        说明                        |   类型   |                 可选值                  |                 默认值                  |
| :-----------------: | :------------------------------------------------: | :------: | :-------------------------------------: | :-------------------------------------: |
| bind-component-name |     绑定组件名，table内部会向上递归找到此组件      |  string  |                    —                    |                    —                    |
|      item-key       | 每个数据项用来作为唯一标识的属性，每项应该是唯一的 |  string  |                    —                    |                    —                    |
|        total        |                      条目总数                      |  number  |                    —                    |                    —                    |
|      page-size      |          每页显示条目个数，支持sync修饰符          |  number  |                    —                    |                   10                    |
|    current-page     |              当前页数，支持sync修饰符              |  number  |                    —                    |                    1                    |
|        data         |                      显示数据                      |  array   |                    —                    |                    —                    |
|       columns       |              表格列配置项，具体看下表              | object[] |                    —                    |                    —                    |
|       buttons       |           批量操作按钮配置项，具体看下表           | object[] |                    —                    |                    —                    |
|       searchs       |             筛选控件配置项，具体看下表             | object[] |                    —                    |                    —                    |
|     search-mode     |            搜索模式，点击搜索或即时搜索            |  number  |             click/immediate             |                  click                  |
|     search-wait     |               即时搜索，去抖延迟时间               |  number  |                    —                    |                   300                   |
|     search-max      |        筛选控件最大显示数，超出部分将被收起        |  number  |                    —                    |                    —                    |
|    search-split     |         筛选控件每行显示个数，仅支持1~4个          |  number  |                    —                    |                    3                    |
|    search-gutter    |                    筛选控件间隔                    |  number  |                    —                    |                   10                    |
|     label-width     |                 筛选控件lable宽度                  |  string  |                    —                    |                 '80px'                  |
|  pagination-layout  |          分页组件布局，子组件名用逗号分隔          |  string  | total, sizes, prev, pager, next, jumper | total, sizes, prev, pager, next, jumper |
|     page-sizes      |           每页显示个数选择器的下拉框类名           | number[] |                    —                    |        [10, 20, 30, 40, 50, 100]        |
|   toolbox-layout    |            工具栏布局，子组件用逗号分隔            |  string  |                                         |                                         |
|    tool-buttons     |             工具栏按钮配置，具体看下表             | object[] |                    —                    |                    —                    |
|        title        |                      表格标题                      |  string  |                    —                    |                    —                    |
|        size         |         表格大小（包括筛选控件、操作按钮）         |  string  |            medium/small/mini            |                    —                    |
|       loading       |                    表格loading                     | boolean  |               true/false                |                  false                  |



#### Column Item

表格列配置

|    参数    |                          说明                           |  类型  |         可选值          | 默认值 |
| :--------: | :-----------------------------------------------------: | :----: | :---------------------: | :----: |
|    type    |                     列内容展示类型                      | string | text/image/operate/slot |  text  |
|   title    |                         列标题                          | string |            —            |   —    |
|    key     |      列展示数据字段名，仅在type为text/image时生效       | string |            —            |   —    |
|    name    |             插槽具名，仅在type为slot时生效              | string |            —            |   —    |
|  buttons   | 表格行操作按钮配置，具体看下表，仅在type为operate时生效 | string |            —            |   —    |
| button-max |          筛选控件最大显示数，超出部分将被收起           | number |            —            |   —    |
|    alt     |             图片描述，仅在type为image时生效             | string |            —            |   —    |



##### button item

表格行操作按钮配置

|   参数    |                             说明                             |  类型   |                  可选值                  | 默认值 |
| :-------: | :----------------------------------------------------------: | :-----: | :--------------------------------------: | :----: |
|   text    |                           按钮文字                           | string  |                    —                     |   —    |
|  handle   | 点击事件绑定函数名，该函数需存在于绑定组件内，若不存在则自table组件内向上查找 | string  |                    —                     |   —    |
|   size    |                             尺寸                             | string  |            medium/small/mini             |   —    |
|   type    |                             类型                             | string  | primary/success/warning/danger/info/text |   —    |
|   icon    |                           图标类名                           | string  |                    —                     |   —    |
| isDisplay |                        是否显示此按钮                        | boolean |                true/false                |  true  |
|   limit   |                      行数据控制按钮显示                      | object  |                    —                     |   —    |

###### limit

表格行数据控制按钮显隐

| 参数  |       说明       |  类型  | 可选值 | 默认值 |
| :---: | :--------------: | :----: | :----: | :----: |
|  key  | 列展示数据字段名 | string |   —    |   —    |
| value | 列展示数据字段值 |  any   |   —    |   —    |



#### Button Item

批量操作按钮配置

|   参数    |                             说明                             |  类型   |                  可选值                  | 默认值 |
| :-------: | :----------------------------------------------------------: | :-----: | :--------------------------------------: | :----: |
|   text    |                           按钮文字                           | string  |                    —                     |   —    |
|  handle   | 点击事件绑定函数名，该函数需存在于绑定组件内，若不存在则自table组件内向上查找 | string  |                    —                     |   —    |
|   size    |                             尺寸                             | string  |            medium/small/mini             |   —    |
|   type    |                             类型                             | string  | primary/success/warning/danger/info/text |   —    |
|   icon    |                           图标类名                           | string  |                    —                     |   —    |
| isDisplay |                        是否显示此按钮                        | boolean |                true/false                |  true  |



#### Search Item

筛选控件配置

|       参数       |                   说明                    |   类型   |      可选值       | 默认值 |
| :--------------: | :---------------------------------------: | :------: | :---------------: | :----: |
|       type       |                 控件类型                  |  string  | input/select/date |   —    |
|      label       |                 控件lable                 |  string  |         —         |   —    |
|       key        |                 绑定key值                 |  string  |         —         |   —    |
|   defaultValue   |                绑定默认值                 |  string  |         —         |   —    |
|     options      |     选项列表，仅在type为select时生效      | object[] |         —         |   —    |
| nativeAttributes | 组件原生属性，控件属性配置参考element文档 |  object  |         —         |   —    |



### Events

组件事件

|     事件名     |                说明                |                             参数                             |
| :------------: | :--------------------------------: | :----------------------------------------------------------: |
| requestTrigger | 请求通知，可在此事件内进行数据请求 | 请求table数据所需关键参数，内容包含筛选控件字段、每页显示条目个数、当前页数 |



### Methods

组件方法

|   方法名   |                       说明                       |                             参数                             |
| :--------: | :----------------------------------------------: | :----------------------------------------------------------: |
|  refresh   |                  table刷新方法                   | （param，isReset）接收两个参数：1.table请求参数，数据将合并至table内部的参数状态中。2.合并参数前是否重置参数。 |
| getChecked |                 获取当前所选数据                 |                              —                               |
| setChecked | 设置当前所选数据，使用此方法必须设置node-key属性 |    （keys）接收一个array类型的参数，当前所选项的key的数组    |



### Slots

组件插槽

功能正在开发中......



