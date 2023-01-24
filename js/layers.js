﻿addLayer("ucp", {
    name: "ucp", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "新手星系", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFF6F",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "时间", // Name of prestige currency
    baseResource: "time", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "时间", description: "时间: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
		upgrades: {
		11:{
		title: "aall.space",
		description: "Galactic_Era 全球同服",
		cost: new Decimal(0),
		},
		12:{
		title: "java?",
		description: "你可以买一些咖啡来熬夜玩游戏树 (睡眠时长 12 小时> 9 小时).",
		cost: new Decimal(5),
		unlocked(){
			return hasUpgrade("时间",11)
		},
		},
		13:{
		title: "不要在地狱睡觉！",
		description: "你可以买一张床来提升你的睡眠质量 (睡眠时长 9 小时> 6 小时).",
		cost: new Decimal(20),
		unlocked(){
			return hasUpgrade("时间",12)
		},
		},
		14:{
		title: "肾上腺素",
		description: "你可以买一些肾上腺素来缩短睡眠市场 (睡眠时长 6 小时> 3 小时).",
		cost: new Decimal(200),
		unlocked(){
			return hasUpgrade("时间",13)
		},
		},
		21:{
		title: "投资又风险",
		description: "你可以解锁一个里程碑",
		cost: new Decimal(50),
		unlocked(){
		return hasUpgrade("时间",12)
		},
		},
		},
		milestones: {
		0: {
        requirementDescription: "75时间",
        effectDescription: "每秒获得1%的时间",
		unlocked(){return hasUpgrade("时间",21)},
        done() {
		return player.时间.points.gte(75) && hasUpgrade("时间",21)},
		},
		},
		passiveGeneration() { return hasMilestone("时间", 0)?0.05:0 },
})


addLayer("w", {
    name: "wood",
    symbol: "V-W",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FF8000",
    requires: new Decimal(5), 
    resource: "原木",
    baseResource: "时间", 
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.55,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    row: 0, 
    hotkeys: [
        {key: "w", description: "w: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
		upgrades:{
		11:{
		title: "原木!",
		description: "你获得了原木，这让你感到兴奋，你想花更多的时间玩这个游戏",
		cost: new Decimal(5),
		effect() {
        let eff = player[this.layer].points.add(1).pow(0.1)
		if (hasUpgrade("w", 12)) eff = player[this.layer].points.add(1).pow(0.15);
		return eff
		},
		effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 
		},
		12:{
		title: "工艺品",
		description: "这个升级上下左右方向的升级效果变成1.5次方",
		cost: new Decimal(20),
		unlocked(){
		return hasUpgrade("w",13)
		},
		},
		13:{
		title: "游戏树真的太棒了!（强调）",
		description: "“原木！”再一次" ,
		cost: new Decimal(15),
		unlocked(){
		return hasUpgrade("w",11)
		},
		effect() {
        let eff = player[this.layer].points.add(1).pow(0.1)
		if (hasUpgrade("w", 12)) eff = player[this.layer].points.add(1).pow(0.15);
		return eff
		},
		effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 
		},
		14:{
		title: "只用三次",
		description: "制作一把木镐",
		cost: new Decimal(new Decimal("50")),
		unlocked(){
		return hasUpgrade("w",13)
		},
		},
		15:{
		title: "太多了!",
		description: "你可以卖掉你的原木",
		cost: new Decimal (50),
		unlocked(){
		return hasUpgrade("w",13)
		},
		},
		},
		clickables: {
		11: {
        display() {return "10原木 -> 3时间"},
		cost: new Decimal(10),
		unlocked(){
		return hasUpgrade("w",15)
		},
		canClick() {
		let w = player[this.layer].points
		if (w >= 10) 
		return true
		},
		onClick(){
		player.w.points = player.w.points.sub(10)
		player.时间.points = player.时间.points.add(3)
		},
		},
		},
})