import { add } from 'tween.js';
import { createParticles } from '../src/Globe';

describe('createParticles', () => {
  let mockScene;
  let mockHexGrid;
  let mockIntroLinesDuration;
  let mockIntroLinesAltitude;

  beforeEach(() => {
    mockScene = {
      remove: jest.fn(),
      add: jest.fn(),
    };
    mockHexGrid = {};
    mockIntroLinesDuration = '1.0';
    mockIntroLinesAltitude = '1.0';

  });

  it('should remove hexGrid from the scene if hexGrid exists', () => {
    const context = {
      hexGrid: mockHexGrid,
      tiles: [],
      baseColor: 'red',
      scene: mockScene,
      introLinesDuration: mockIntroLinesDuration,
      introLinesAltitude: mockIntroLinesAltitude,
    };

    createParticles.call(context);

    expect(mockScene.remove).toHaveBeenCalledWith(mockHexGrid);
  });

  it('should not remove hexGrid from the scene if hexGrid does not exist', () => {
    const context = {
      hexGrid: null,
      tiles: [],
      baseColor: 'red',
      scene: mockScene,
      introLinesDuration: mockIntroLinesDuration,
      introLinesAltitude: mockIntroLinesAltitude,
    };

    createParticles.call(context);

    expect(mockScene.remove).not.toHaveBeenCalled();
  });

  // Add more tests as needed
});