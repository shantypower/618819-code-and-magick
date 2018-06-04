'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_SPACE = 50;
var RESULT_FONT = 'PT Mono';
var RESULT_SIZE = '16';
var RESULT_FONT_SIZE = RESULT_SIZE + 'px ' + RESULT_FONT;

var enableShadow = function (ctx, isEnable) {
  var value = (isEnable === true) ? GAP : 0;
  ctx.shadowOffsetX = value;
  ctx.shadowOffsetY = value;
  ctx.shadowBlur = value;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
};

var renderCloud = function (ctx, rx, ry, color) {
  ctx.fill();
  ctx.fillStyle = color;
  ctx.ellipse(rx, ry, rx, ry, Math.PI / 180, 0, 2 * Math.PI);
  enableShadow(ctx, true);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  ctx.beginPath();
  renderCloud(ctx, CLOUD_X + CLOUD_WIDTH / 8, CLOUD_Y + CLOUD_HEIGHT / 4, '#fff');
  renderCloud(ctx, CLOUD_X + CLOUD_WIDTH / 6, CLOUD_Y + CLOUD_HEIGHT / 3, '#fff');
  renderCloud(ctx, 1.7 * CLOUD_X + CLOUD_WIDTH / 3, CLOUD_Y + CLOUD_HEIGHT, '#fff');
  renderCloud(ctx, 1.7 * CLOUD_X + CLOUD_WIDTH / 3, CLOUD_Y + CLOUD_HEIGHT, '#fff');
  ctx.closePath();

  ctx.fillStyle = 'blue';
  ctx.textAlign = 'center';
  ctx.font = RESULT_FONT_SIZE;
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;
  ctx.shadowBlur = 10;
  ctx.shadowColor = 'rgba(0, 0, 0, 1)';
  ctx.strokeText('Ура вы победили!', CLOUD_X + GAP + CLOUD_WIDTH / 2, Number(RESULT_SIZE) + GAP);
  ctx.strokeText('Список результатов: ', CLOUD_X + GAP + CLOUD_WIDTH / 2, Number(RESULT_SIZE) * 2 + GAP);
  ctx.fillStyle = '#000';
  ctx.textAlign = 'left';

  var maxTime = getMaxElement(times);
  for (var i = 0; i < players.length; i++) {
    var barColor = 'rgba(255, 0, 0, 1)';
    if (i > 0) {
      barColor = 'rgba(' + 0 + ',' + 0 + ',' + 255 + ',' + Math.random() + ')';
    }
    ctx.fillText(parseInt(times[i], 10), CLOUD_X + 4 * GAP + (BAR_SPACE + BAR_WIDTH) * i, Number(RESULT_SIZE) * 3 + GAP * 2 + 150 - (BAR_HEIGHT * times[i]) / maxTime);
    ctx.fillStyle = barColor;
    ctx.fillRect(CLOUD_X + 4 * GAP + (BAR_SPACE + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP * 2 - Number(RESULT_SIZE) - BAR_HEIGHT * times[i] / maxTime, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + 4 * GAP + (BAR_SPACE + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP);
  }
};
