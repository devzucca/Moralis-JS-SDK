import MoralisCore from '@moralisweb3/core';
import { setupStreams } from '../../test/setup';
import { StreamErc721Approval } from './StreamErc721Approval';
import { mockStreamErc721Approval } from './StreamErc721Approval.mock';

const testsInputs = Object.entries(mockStreamErc721Approval).map(([name, input]) => ({ name, input }));

describe('StreamErc721Approval', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = setupStreams();
  });

  it.each(testsInputs)('should create succesfully for: $name', ({ input }) => {
    const approval = StreamErc721Approval.create(input, core);
    const output = approval.format();

    expect(approval).toBeDefined();
    expect(output).toBeDefined();
  });

  describe('Default', () => {
    const input = mockStreamErc721Approval.FULL;
    let approval: StreamErc721Approval;

    beforeAll(() => {
      approval = StreamErc721Approval.create(input, core);
    });

    it('should return correct values for all getters', () => {
      expect(approval.chain.hex).toBe('0x1');
      expect(approval.transactionHash).toBe('0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7');
      expect(approval.logIndex).toBe(0);
      expect(approval.tokenId).toBe('123');
      expect(approval.approved.lowercase).toBe('0xee010a7476bc5adc88f1befc68c3b58f27f90419');
      expect(approval.contract.lowercase).toBe('0xdac17f958d2ee523a2206206994597c13d831ec7');
      expect(approval.owner.lowercase).toBe('0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5');
      expect(approval.tokenContractType).toBe('ERC721');
      expect(approval.tokenName).toBe('Stream');
      expect(approval.tokenSymbol).toBe('STREAMS');
    });

    it('should parse the values to JSON correctly', () => {
      const json = approval.toJSON();
      expect(json).toStrictEqual({
        approved: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
        chain: '0x1',
        contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        logIndex: 0,
        owner: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        tokenContractType: 'ERC721',
        tokenId: '123',
        tokenName: 'Stream',
        tokenSymbol: 'STREAMS',
        transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
      });
    });

    it('should parse the values to a JSON on format() correctly', () => {
      const json = approval.format();

      expect(json).toStrictEqual({
        approved: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
        chain: '0x1',
        contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        logIndex: 0,
        owner: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        tokenContractType: 'ERC721',
        tokenId: '123',
        tokenName: 'Stream',
        tokenSymbol: 'STREAMS',
        transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
      });
    });
  });
});
