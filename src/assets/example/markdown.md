# 微信 Markdown 编辑器

## 介绍

这款编辑器可以将 Markdown 文档自动即时渲染为微信公众号编辑器样式，让你不再为微信文章排版而发愁！只要你会基本的 Markdown 语法，就能做出一篇样式简洁而又美观大方的微信图文。

这让你在公众号创作时，把更多的时间专注于文章本身，而不是繁琐地调整文章样式。

### **关于 Markdown**

1. **Markdown** 是一种轻量级标记语言，可将文本转换为标准的 XHTML 或 HTML 文档。
2. 其强大之处在于，使用统一的格式即可在所有支持 Markdown 的编辑器中转换为发布样式，确保最大程度的兼容性，无需担心因复制到不同编辑器而导致的样式损坏。
3. 正如你所见，Markdown 可无缝转换为微信支持的样式，同时也能在 GitHub 等平台上呈现类似的格式，而无需修改任何内容。
4. 想要学习 Markdown 语法？请查看 👉 [Markdown 基础语法](https://www.markdown.xyz/basic-syntax/)。
5. 想要体验编辑器，请查看👉[微信 MD 编辑器](https://md.flyeric.top)。

### **为什么选择我们的工具？**

- **所见即所得**：左侧编辑，右侧实时预览，让你清楚了解文章最终效果
- **一键复制**：一键复制为微信公众号格式，直接粘贴到公众号后台即可
- **多种预览模式**：支持自适应、手机和宽屏三种预览模式，满足不同需求
- **丰富的样式设置**：支持主题、字体、字号、主题色、代码主题等多种样式设置
- **完全免费**：开源免费，无需注册，无需安装，打开即用

## Markdown 基础语法样式

### 1. 标题

用 `#` 号来创建标题。标题从 `#` 开始，`#` 的数量表示标题的级别。为了兼容考虑，请在井号和标题文本之间添加一个空格。

```markdown
# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题
```

以上代码将渲染出一组层次分明的标题，使你的内容井井有条。

### 2. 段落与换行

要创建段落，请使用空白行将一行或多行文本进行分隔。建议不要用空格spaces或制表符tabs缩进段落。

只需键入回车键return即可实现换行。

### 3. 强调字体样式

通过将文本设置为粗体或斜体来强调其重要性。

- **粗体**：用两个星号或下划线包裹文字，如 `**粗体**` 或 `__粗体__`。
- _斜体_：用一个星号或下划线包裹文字，如 `*斜体*` 或 `_斜体_`。
- ~~删除线~~：用两个波浪线包裹文字，如 `~~删除线~~`。

### 4. 块引用

在段落前添加一个 `>` 来创建块引用。若要包含多个段落，为段落之间的空白行各添加一个 `>` 符号。若要嵌套引用，添加一个 `>>` 符号即可。

> 这是第一个段落
>
> 这是第二个段落
>
> > 这是一个嵌套引用

这让你的引用更加富有层次感。

### 5. 列表

- **无序列表**：用 `-`、`*` 或 `+` 加空格开始一行。
- **有序列表**：使用数字加点号（`1.`、`2.`）开始一行。

可以使用缩进来实现列表的嵌套效果。

- 无序列表项 1
- 无序列表项 2
  - 嵌套子项

1. 有序列表项 1
2. 有序列表项 2
   1. 子项 1
   2. 子项 2

### 6. 代码

- **行内代码**：用反引号包裹，如 `console.log("Hello Markdown!");`。
- **代码块**：用三个反引号包裹，并指定语言。

**JavaScript**

```javascript
function greet(name) {
    console.log(`Hello, ${name}!`);
}
greet("Markdown");
```

**Python**

```python
def greet(name):
    print(f"Hello, {name}!")
greet("Markdown")
```

**Java**

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Markdown!");
    }
}
```

### 7. 分割线

用三个或更多的 `-`、`*` 或 `_` 来创建分割线。

---

为你的内容添加视觉分隔。

### 8. 链接

将链接文本括在方括号（例如 `[Eric技术圈]`）中，后面紧跟着括在圆括号中的 URL（例如 `(https://flyeric.top)` ）。

访问 [Eric 技术圈](https://flyeric.top)

如果是微信公众号文章的超链接可以点击打开的，但其他链接都无法点击，所以默认使用类似于文献的底部引用。

### 9. 图片

添加感叹号（`!`），然后紧跟着是方括号，方括号中可添加备用文本（alt text，即图片显示失败后显示此文本），最后跟着圆括号，圆括号中添加图片资源的路径或 URL。如 `![描述文本](图片链接)`。

![Eric技术圈公众号](https://eric-tech-hub-1256249917.cos.ap-chengdu.myqcloud.com/qrcode_for_gh_996c5c8013f2_430.jpg)

### 10. 表格

| 语言   | 代码示例                      |
| ------ | ----------------------------- |
| Python | `print("Hello")`              |
| Java   | `System.out.println("Hello")` |
| JS     | `console.log("Hello")`        |


## 最后

微信 Markdown 编辑器为公众号创作者提供了一个高效、便捷的排版工具。通过简单的 Markdown 语法，你可以专注于内容创作，而不必浪费时间在繁琐的样式调整上。

本工具的优势在于即时预览和一键复制功能，让你的创作过程更加流畅。无论你是经验丰富的 Markdown 用户，还是刚刚接触这种语法的新手，这款编辑器都能帮助你轻松生成美观、规范的微信公众号文章。

技术应该为创作赋能，而不是成为障碍。希望这款工具能够为你的公众号内容创作带来愉悦的体验，让你的读者享受到既美观又专业的阅读体验。

现在就开始尝试使用微信 Markdown 编辑器，让你的公众号文章创作更上一层楼！

#### 推荐阅读

- [为什么后端程序员容易成为技术 Leader](https://mp.weixin.qq.com/s/BGz3OFvM-wyb574dS_jegw)
- [为什么程序员独爱 MacBook 进行编程？](https://mp.weixin.qq.com/s/oCKHpPZtyXB5gTRrS8G_Iw)
- [不称职技术 Leader 的六大表现](https://mp.weixin.qq.com/s/4XAvt9AalBtHIcy5_Unr1g)
- [全栈 Web 开发：必备的 Mac 应用和工具](https://mp.weixin.qq.com/s/udbGzOh34stgGS9NZApS1w)
- [MacOS 从 Sonoma 降级到 Monterey](https://mp.weixin.qq.com/s/zqzNWWAHa0m1IWgriV_YSA)
- [DDD 分层架构落地实践](https://mp.weixin.qq.com/s/g2xaH_mLf07fdb-4TxAMXg)
- [数据一致性方案设计](https://mp.weixin.qq.com/s/MAuUBI8aPHajK7v-fQ-jWw)
- [私有化部署 Dify 并快速搭建 AI 应用](https://mp.weixin.qq.com/s/kTuOVuXlbRWcdCiq0PmYEg)
- [应用分层架构最佳实践：Alibaba COLA 4.0](https://mp.weixin.qq.com/s/9YhdYl31CPgvOLo9RzGGQQ)
- [打造高效MacOS系统环境](https://mp.weixin.qq.com/s/f8qqAiplYnL_RZH6QeNRPw)
- [使用 Spring AI 快速搭建RAG应用](https://mp.weixin.qq.com/s/vIG2KzMV30P9yHryfJkOrQ)
- [快速搭建本地大语言模型和知识库](https://mp.weixin.qq.com/s/6HeHakbmxAq7ebBV3_YtZA)
- [AI Agent 实践](https://mp.weixin.qq.com/s/TCo3y4ZuGeT96AwxLdBJHQ)