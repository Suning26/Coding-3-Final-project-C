def generate_story(ingredient):
    templates = {
        "milk": "《即将过期的牛奶致辞》：我快撑不住了，希望能在明天早餐时被使用。",
        "carrot": "胡萝卜的独白：我还很脆，别忘了我可以做沙拉！",
        # 更多模板...
    }
    return templates.get(ingredient, f"{ingredient} 的故事还在创作中……")
