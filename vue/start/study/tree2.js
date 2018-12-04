// demo data
var data = 
{
    'childNode': [
      {
        'childNode': [
          {
            'icon': '',
            'id': 242,
            'menuLevel': 3,
            'menuName': '旅游订单',
            'menuTop': 1,
            'menuUrl': '/',
            'buttonControl': '0',
            'supMenuID': 241
          },
          {
            'icon': '',
            'id': 243,
            'menuLevel': 3,
            'menuName': '签证订单',
            'menuTop': 2,
            'menuUrl': '/',
            'buttonControl': '0',
            'supMenuID': 241
          },
          {
            'icon': '',
            'id': 244,
            'menuLevel': 3,
            'menuName': '出团通知书',
            'menuTop': 3,
            'menuUrl': '/',
            'buttonControl': '0',
            'supMenuID': 241
          }
        ],
        'icon': '',
        'id': 241,
        'menuLevel': 2,
        'menuName': '订单管理',
        'menuTop': 1,
        'menuUrl': '/',
        'buttonControl': '0',
        'supMenuID': 240
      },
      {
        'childNode': [
          {
            'icon': '',
            'id': 246,
            'menuLevel': 3,
            'menuName': '旅游产品',
            'menuTop': 1,
            'menuUrl': '/tourProduct',
            'buttonControl': '0',
            'supMenuID': 245
          },
          {
            'icon': '',
            'id': 247,
            'menuLevel': 3,
            'menuName': '图库',
            'menuTop': 2,
            'menuUrl': '/basePicStore',
            'buttonControl': '0',
            'supMenuID': 245
          },
          {
            'icon': '',
            'id': 248,
            'menuLevel': 3,
            'menuName': '签证产品',
            'menuTop': 3,
            'menuUrl': '/',
            'buttonControl': '0',
            'supMenuID': 245
          }
        ],
        'icon': '',
        'id': 245,
        'menuLevel': 2,
        'menuName': '产品管理',
        'menuTop': 2,
        'menuUrl': '/',
        'buttonControl': '0',
        'supMenuID': 240
      },
      {
        'childNode': [
          {
            'icon': '',
            'id': 250,
            'menuLevel': 3,
            'menuName': '旅游广告',
            'menuTop': 1,
            'menuUrl': '/',
            'buttonControl': '0',
            'supMenuID': 249
          }
        ],
        'icon': '',
        'id': 249,
        'menuLevel': 2,
        'menuName': '广告管理',
        'menuTop': 3,
        'menuUrl': '/',
        'buttonControl': '0',
        'supMenuID': 240
      }
    ],
    'icon': '',
    'id': 240,
    'menuLevel': 1,
    'menuName': '业务中心',
    'menuTop': 1,
    'menuUrl': '/',
    'buttonControl': '0',
    'supMenuID': 0
  }


// boot up the demo
var demo = new Vue({
 name: 'treeMenu',
  props: ['model', 'menuList', 'label', 'selectKeys'],
  data () {
    return {
      open: true, // 默认打开彩单树
      selAllkeys: []
    }
  },
  computed: {
    isFolder: function () {
      return this.model.childNode && this.model.childNode.length
    },
    isButton: function () {
      if (this.model.buttonControl === '1') {
        return 'btnCls'
      } else {
        return 'menuCls'
      }
    },
    hasBorder: function () {
      if (this.model.menuLevel === 1) {
        return 'blk_border'
      }
    }
  },
  methods: {
    getAllKeys () {
      var keys = []
      var objs = $('.group' + this.label + ':checked')
      for (let i = 0; i < objs.length; i++) {
        let id = objs[i].id
        id = id.substring(4)
        keys.push((id - 0)) // 保存选中菜单id
      }
      return keys
    },
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    // 根据id获取menu对象
    getMeunById (id, allMenuList) {
      var menu = {}
      if (allMenuList.id === id) { // 一级菜单
        menu = allMenuList
      } else if (allMenuList.childNode && allMenuList.childNode.length) { // 二级菜单
        for (let i = 0; i < allMenuList.childNode.length; i++) {
          if (allMenuList.childNode[i].id === id) {
            menu = allMenuList.childNode[i]
            break
          } else if (allMenuList.childNode[i].childNode && allMenuList.childNode[i].childNode.length) { // 三级
            for (let j = 0; j < allMenuList.childNode[i].childNode.length; j++) {
              if (allMenuList.childNode[i].childNode[j].id === id) {
                menu = allMenuList.childNode[i].childNode[j]
                break
              }
            }
          }
        }
      }
      return menu
    },
    // checkbox点击事件
    selTree (model) {
      var obj = $('#menu' + model.id)[0] // checkbox DOM对象
      if (obj.checked) { // 选中
        // 若存在下级，下级全部选中
        if (model.childNode && model.childNode.length) {
          this.subMenusOp(model.childNode, 1)
        }
        // 若存在上级,确认是否需要选中上级CheckBox
        if (model.supMenuID !== 0 && model.menuLevel > 2) {
          this.supMenusOp(model.supMenuID, 1)
        }
      } else { // 取消
        // 若存在下级，下级全部取消
        if (model.childNode && model.childNode.length) {
          this.subMenusOp(model.childNode, 0)
        }
        // 若存在上级，确认是否需要取消上级CheckBox
        if (model.supMenuID !== 0 && model.menuLevel > 2) {
          this.supMenusOp(model.supMenuID, 0)
        }
      }
      this.getAllKeys()
    },
    // 下级菜单操作 flag=1为选中,flag=0为取消
    subMenusOp (childNodes, flag) {
      for (let i = 0; i < childNodes.length; i++) {
        var menu = childNodes[i]
        var id = menu.id
        if (flag === 1) { // 选中
          $('#menu' + id)[0].checked = true
        } else { // 取消
          $('#menu' + id)[0].checked = false
        }
        if (menu.childNode && menu.childNode.length) {
          this.subMenusOp(menu.childNode, flag)
        }
      }
    },
    // 上级菜单操作（选中:flag=1,取消:flag=0）
    supMenusOp (id, flag) {
      var menu = this.getMeunById(id, this.menuList)
      if (menu.childNode && menu.childNode.length) {
        var childLength = menu.childNode.length // 直接子级个数
        var selectCount = 0
        for (let i = 0; i < childLength; i++) {
          let id1 = menu.childNode[i].id
          if ($('#menu' + id1)[0].checked) {
            selectCount++
          }
        }
        if (flag === 1) { // 选中
          if (childLength === selectCount) {
            $('#menu' + id)[0].checked = true
            if (menu.supMenuID !== 0 && menu.menuLevel > 2) {
              this.supMenusOp(menu.supMenuID, flag)
            }
          }
        } else if (flag === 0) {
          if (childLength !== selectCount) {
            $('#menu' + id)[0].checked = false
            if (menu.supMenuID !== 0 && menu.menuLevel > 2) {
              this.supMenusOp(menu.supMenuID, flag)
            }
          }
        }
      }
    },
    // 计算所有下级节点是否全部选中，是返回true，否返回false
    isAllSel (childNodes, selectKeys) {
      var nodeKeys = [] // 选中的id集合
      this.addKeys(childNodes, selectKeys, nodeKeys)
      var allKeys = []
      this.getNodesCount(childNodes, allKeys)
      if (nodeKeys.length === allKeys.length) {
        return true
      } else {
        return false
      }
    },
    // 计算childNodes下选中的id集合
    addKeys (childNodes, selectKeys, Arrs) {
      for (let i = 0; i < childNodes.length; i++) {
        if (selectKeys.indexOf(childNodes[i].id) >= 0) {
          Arrs.push(childNodes[i].id)
        }
        if (childNodes[i].childNode && childNodes[i].childNode.length) {
          this.addKeys(childNodes[i].childNode, selectKeys, Arrs)
        }
      }
    },
    // 计算childNodes的子级数
    getNodesCount (childNodes, allKeys) {
      for (let i = 0; i < childNodes.length; i++) {
        allKeys.push(childNodes[i].id)
        if (childNodes[i].childNode && childNodes[i].childNode.length) {
          this.getNodesCount(childNodes[i].childNode, allKeys)
        }
      }
    }
  },
  mounted () {
    // 禁止复选框的冒泡事件
    $("input[type='checkbox']").click(function (e) {
      e.stopPropagation()
    })
    // 选中菜单使能
    if (this.selectKeys instanceof Array && this.selectKeys.length > 0 && this.selectKeys.indexOf(this.model.id) >= 0) {
      if (this.model.childNode && this.model.childNode.length && this.model.menuLevel !== 1) { // 包含子级,一级菜单除外
        // 计算所有子节点是否全部选中
        if (this.isAllSel(this.model.childNode, this.selectKeys)) {
          $('#menu' + this.model.id)[0].checked = true
        }
      } else {
        $('#menu' + this.model.id)[0].checked = true
      }
    }
  }
})