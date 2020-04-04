import { Canvas } from 'terminal-canvas';
import { Rectangle } from '../src/Rectangle';
import { ShapeObject } from 'kittik-shape-basic';

describe('Shape::Rectangle', () => {
  it('Should properly render with default options', () => {
    const cursor = Canvas.create();
    const rectangle = new Rectangle({ x: '0', y: '0', height: '2', width: '5' });
    const backgroundSpy = jest.spyOn(cursor, 'background').mockReturnThis();
    const foregroundSpy = jest.spyOn(cursor, 'foreground').mockReturnThis();
    const moveToSpy = jest.spyOn(cursor, 'moveTo').mockReturnThis();
    const writeSpy = jest.spyOn(cursor, 'write').mockReturnThis();

    rectangle.render(cursor);

    expect(backgroundSpy).toBeCalledTimes(1);
    expect(backgroundSpy).toBeCalledWith('none');
    expect(foregroundSpy).toBeCalledTimes(1);
    expect(foregroundSpy).toBeCalledWith('none');
    expect(moveToSpy).toBeCalledTimes(5);
    expect(moveToSpy).toBeCalledWith(0, 0);
    expect(moveToSpy).toBeCalledWith(0, 1);
    expect(writeSpy).toBeCalledTimes(4);
    expect(writeSpy).toBeCalledWith('     ');
  });

  it('Should properly render with custom options', () => {
    const cursor = Canvas.create();
    const rectangle = new Rectangle({
      text: 'test',
      width: '11',
      height: '11',
      x: '1',
      y: '1',
      background: 'yellow',
      foreground: 'black'
    });

    const backgroundSpy = jest.spyOn(cursor, 'background').mockReturnThis();
    const foregroundSpy = jest.spyOn(cursor, 'foreground').mockReturnThis();
    const moveToSpy = jest.spyOn(cursor, 'moveTo').mockReturnThis();
    const writeSpy = jest.spyOn(cursor, 'write').mockReturnThis();

    rectangle.render(cursor);

    expect(backgroundSpy).toBeCalledTimes(1);
    expect(backgroundSpy).toBeCalledWith('yellow');
    expect(foregroundSpy).toBeCalledTimes(1);
    expect(foregroundSpy).toBeCalledWith('black');
    expect(moveToSpy).toBeCalledTimes(14);
    expect(writeSpy).toBeCalledTimes(13);
  });

  it('Should properly serialize shape to Object representation', () => {
    const rectangle = new Rectangle();
    const obj = rectangle.toObject();

    expect(obj).toEqual({
      type: 'Rectangle',
      options: {
        text: '',
        width: '50%',
        height: '25%',
        x: 'left',
        y: 'top',
        background: 'none',
        foreground: 'none'
      }
    });
  });

  it('Should properly create rectangle from Object representation', () => {
    const obj: ShapeObject = {
      type: 'Rectangle',
      options: {
        text: 'test',
        width: '30',
        height: '50',
        x: '1',
        y: '1'
      }
    };

    const rectangle = Rectangle.fromObject<Rectangle>(obj);

    expect(rectangle).toBeInstanceOf(Rectangle);
    expect(rectangle.text).toEqual('test');
    expect(rectangle.width).toEqual('30');
    expect(rectangle.height).toEqual('50');
    expect(rectangle.x).toEqual('1');
    expect(rectangle.y).toEqual('1');
    expect(rectangle.background).toEqual('none');
    expect(rectangle.foreground).toEqual('none');
  });
});